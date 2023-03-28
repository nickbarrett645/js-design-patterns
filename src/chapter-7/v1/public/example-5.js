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

var myHandler = new QueuedHandler();
var callback = {
    success: function(responseText) {
        alert('Success: ' + responseText)
    },
    failure: function(statusCode) {
        alert('Failure: ' + statusCode)
    }
};

// Success
myHandler.request('GET', 'example-5.html', callback);
myHandler.request('GET', 'example-5.js', callback);
// Failure
myHandler.request('GET', 'error.html', callback);