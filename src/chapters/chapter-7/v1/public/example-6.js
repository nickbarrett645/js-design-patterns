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
    isOffline: function() {
        return !(Math.floor(Math.random() * 2) % 2);
    }
}

var myHandler = new OfflineHandler();
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