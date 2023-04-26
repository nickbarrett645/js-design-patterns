var Interface = function(name, methods) {
    if(arguments.length !== 2) {
        throw new Error('Interface constructor called with ' + arguments.length + 
        ' arguments, but expected exactly 2.');
    }

    this.name = name;
    this.methods = [];
    for(var i = 0; i < methods.length; i++) {
        if(typeof methods[i] !== 'string') {
            throw new Error('Interface constructor expects method names to be passed in as a string');
        }
        this.methods.push(methods[i]);
    }
}

// Static class method
Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {
        throw new Error('Function Interface.ensureImplements called with ' +
        arguments.length + ' arguments, but expected at least 2.')
    }

    for(var i = 1; i < arguments.length; i++) {
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error('Function Interface.ensureImplements expects arguments' +
            ' two and above to be instances of Interface.');
        }

        for(var j = 0; j < interface.methods.length; j++) {
            var method = interface.methods[j];
            if(!object[method] || typeof object[method] !== 'function') {
                throw new Error('Function Interface.ensureImplements: object ' +
                'does not implement the ' + interface.name + ' interface. Method ' +
                method + ' was not found.');
            }
        }
    }
}
var extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superClass = superClass.prototype;
    if(superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass
    }
}
// AjaxHandler Interface
var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);

// SimpleHandler class
var SimpleHandler = function() {}
SimpleHandler.prototype = {
    request: function(method, url, callback, postVars) {
        var xhr = this.createXhrObject();
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== 4) {
                return;
            }

            (xhr.status === 200) ? 
                callback.success(xhr.responseText, xhr.responseXML):
                callback.failure(xhr.status);
        }
        xhr.overrideMimeType('application/xml');
        xhr.open(method, url, true);
        if(method !== 'POST') {
            postVars = null;
        }
        xhr.send(postVars);
    },
    createXhrObject: function() {
        var methods = [
            function() {
                return new XMLHttpRequest();
            },
            function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP')
            }
        ];

        for(var i = 0; i < methods.length; i++) {
            try {
                methods[i]();
            } catch(error) {
                continue;
            }
            this.createXhrObject = methods[i];
            return methods[i]();
        }

        throw new Error('SimpleHandler: Coulnd not create and XHR object.');
    }
};

//QueuedHanlder Class
var QueuedHandler = function() {
    Interface.ensureImplements(this, AjaxHandler);
    this.queue = [];
    this.requestInProgress = false;
    this.retryDelay = 5;
}

extend(QueuedHandler, SimpleHandler);

QueuedHandler.prototype.request = function(method, url, callback, postVars, override) {
    if(this.requestInProgress && !override) {
        this.queue.push({
            method: method,
            url: url,
            callback: callback,
            postVars: postVars
        });
    } else {
        
        this.requestInProgress = true;
        var xhr = this.createXhrObject();
        var that = this;
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== 4) {
                return
            }

            if(xhr.status === 200) {
                callback.success(xhr.responseText, xhr.responseXML);
                that.advanceQueue();
            } else {
                callback.failure(xhr.status);
                setTimeout(function() {
                    that.request(method, url, callback, postVars);
                }, that.retryDelay * 1000);
            }
        }
        xhr.open(method, url, true);
        if(method !== 'POST') {
            postVars = null;
        }
        xhr.send(postVars)
    }
}

QueuedHandler.prototype.advanceQueue = function() {
    if(this.queue.length === 0) {
        this.requestInProgress = false;
        return;
    }

    var req = this.queue.shift();
    this.request(req.method, req.url, req.callback, req.postVars, true);
}

//QueuedHanlder Class
var OfflineHandler = function() {
    Interface.ensureImplements(this, AjaxHandler);
    this.storedRequests = [];
}

extend(OfflineHandler, SimpleHandler);

OfflineHandler.prototype.request = function(method, url, callback, postVars) {
    if(XhrManager.isOffline()) {
        console.log('offline');
        this.storedRequests.push({
            method: method,
            url: url,
            callback: callback,
            postVars: postVars
        })
    } else {
        console.log('not offline')
        this.flushStoredRequests();
        OfflineHandler.superClass.request(method, url, callback, postVars);
    }
}

OfflineHandler.prototype.flushStoredRequests = function() {
    for(var i = 0; i < this.storedRequests.length; i++) {
        var req = this.storedRequests[i];
        OfflineHandler.superClass.request(req.method, req.url, req.callback, req.postVars);
    }
}

// set isOffline to randomly decide if offline or not
var XhrManager = {
    createXhrObject: function() {
        var xhr;
        if(this.isOffline()) {
            console.log('Using OfflineHandler');
            xhr = new OfflineHandler();
        } else if(this.isHighLatency()) {
            console.log('Using QueuedHanlder ');
            xhr = new QueuedHandler();
        } else {
            console.log('Using SimpleHanlder');
            xhr = new SimpleHandler();
        }

        return xhr;
    },

    isOffline: function() {
        // This can be changed if you want to use a different xhr handler
        return false;
    },

    isHighLatency: function() {
        // This can be changed if you want to use a different xhr handler
        return false;
    },
}

var DisplayModule = new Interface('DisplayModule', ['append', 'remove', 'clear']);

var ListDisplay = function(id, parent) {
    this.list = document.createElement('ul');
    this.list.id = id;
    parent.appendChild(this.list);
}

ListDisplay.prototype = {
    append: function(text) {
        var newEl = document.createElement('li');
        this.list.appendChild(newEl);
        newEl.innerHTML = text;
        return newEl;
    },
    remove: function(el) {
        this.list.removeChild(el);
    },
    clear: function() {
        this.list.innerHTML = '';
    }
};

var FeedReader = function(display, xhrHandler, conf) {
    this.display = display;
    this.xhrHandler = xhrHandler;
    this.conf = conf;

    this.startUpdates();
}

FeedReader.prototype = {
    fetchFeed: function() {
        var that = this;

        var callback = {
            success: function(text, xml) {that.parseFeed(text, xml)},
            failure: function(status) {that.showError(status)}
        }

        this.xhrHandler.request('GET', 'rss?proxy=' + this.conf.feedUrl, callback);
    },
    parseFeed: function(responseText, responseXML) {
        this.display.clear();
        var items = responseXML.getElementsByTagName('item');
        for(var i = 0; i < items.length; i++) {
            var title = items[i].getElementsByTagName('title')[0];
            var link = items[i].getElementsByTagName('link')[0];
            this.display.append('<a href="' + link.firstChild.data + '">' + title.firstChild.data + '</a>');
        }
    },
    showError: function() {
        this.display.clear();
        this.display.append('Error fetching feed.')
    },
    stopUpdates: function() {
        clearInterval(this.interval);
    },
    startUpdates: function() {
        this.fetchFeed();
        /*var that = this;
        this.interval = setInterval(function() {
            that.fetchFeed();
        }, this.conf.interval * 1000);*/
    }

}

var FeedManager = {
    createFeedReader: function(conf) {
        var displayModule = new ListDisplay(conf.id, conf.parent);
        Interface.ensureImplements(displayModule, DisplayModule);

        var xhrHandler = XhrManager.createXhrObject();
        Interface.ensureImplements(xhrHandler, AjaxHandler);

        return new FeedReader(displayModule, xhrHandler, conf);
    }
};

onload = function() {
    var conf = {
        id: 'tech-crunch',
        feedUrl: 'https://techcrunch.com/feed/',
        updateInterval: 60,
        parent: document.getElementById('parent')
    };
    FeedManager.createFeedReader(conf);
}

