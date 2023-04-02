var asyncRequest = (function() {
    function handleReadyState(o, callback) {
        var poll = window.setInterval(
            function() {
                if(o && o.readyState === 4) {
                    window.clearInterval(poll);
                    if(callback) {
                        callback(o);
                    }
                }
            }, 50);
    }

    var getXHR = function() {
        var http;
        try {
            http = new XMLHttpRequest();
            getXHR = function() {
                return http;
            };
        } catch(error) {
            var msxml = [
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];
            for(var i = 0; i < msxml.length; i++) {
                try {
                    http = new ActiveXObject(msxml[i]);
                    getXHR = function() {
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                } catch(error) {

                }
            }

        }

        return http;
    };
    
    return function(method, uri, callback, postData) {
        var http = getXHR();
        http.open(method, uri, true);
        handleReadyState(http, callback);
        http.overrideMimeType('application/json');
        http.send(postData || null);
        return http;
    }

})();

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
}

// Not needed for newer browsers but including it becauses it in the examples
if(!Array.prototype.forEach) {
    Array.method('forEach', function(fn, thisObj) {
        var scope = thisObj || window;
        for(var i= 0; i < this.length; i++) {
            fn.call(scope, this[i], i, this)
        }
    });
}

if(!Array.prototype.filter) {
    Array.method('filter', function(fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for(var i = 0; i < this.length; i++) {
            if(!fn.call(scope, this[i], i, this)) {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    });
}

window.DED = window.DED || {};

DED.util = DED.util || {};

DED.util.Observer = function() {
    this.fns = [];
}

DED.util.Observer.prototype = {
    subscribe: function(fn) {
        this.fns.push(fn);
    },
    unsubscribe: function(fn) {
        this.fns.filter(function(el) {
            if(el !== fn) {
                return el;
            }
        });
    },
    fire: function(o) {
        this.fns.forEach(function(el) {
            el(o);
        });
    }
};

DED.Queue = function() {
    // Queued Requests
    this.queue = [];

    // Observalble Objects that can notify the client of intering moments
    // on each DED.Queue instance
    this.onComplete = new DED.util.Observer();
    this.onFailure = new DED.util.Observer();
    this.onFlush = new DED.util.Observer();

    this.retryCount = 3;
    this.currentRetry = 0;
    this.paused = false;
    this.timeout = 5000;
    this.conn = {};
    this.timer = {};
}

DED.Queue.method('flush', function() {
    if(!this.queue.length > 0) {
        return;
    }

    if(this.paused) {
        this.paused = false;
        return;
    }

    var that = this;
    this.currentRetry++
    var abort = function() {
        that.conn.abort();
        if(that.currentRetry === that.retryCount) {
            that.onFailure.fire();
            that.currentRetry = 0;
        } else {
            that.flush();
        }
    };

    this.timer = window.setTimeout(abort, this.timeout);
    var callback = function(o) {
        window.clearTimeout(that.timer);
        that.currentRetry = 0;
        that.queue.shift();
        that.onFlush.fire(o.responseText);
        if(that.queue.length === 0) {
            that.onComplete.fire();
            return;
        }
        that.flush();
    };
    var connection = this.queue[0];
    this.conn = asyncRequest(connection.method, connection.uri, callback, connection.params);
}).method('setRetryCount', function(count) {
    this.retryCount = count;
}).method('setTimeout', function(time) {
    this.timeout = time;
}).method('add', function(o) {
    this.queue.push(o);
}).method('pause', function() {
    this.paused = true;
}).method('dequeue', function() {
    this.queue.pop();
}).method('clear', function() {
    this.queue = [];
}).method('getStatus', function() {
    return this.paused;
});

onload = function() {
    var q = new DED.Queue();
    q.setRetryCount(5);
    q.setTimeout(3000);

    var items = document.getElementById('items');
    var results = document.getElementById('results');
    var queue = document.getElementById('queue-items');
    var adders = document.getElementById('adders');

    var requests = [];

    q.onFlush.subscribe(function(data) {
        results.innerHTML += ' ' + JSON.parse(data).id;
        requests.shift();
        queue.innerHTML = requests.toString();
    });

    q.onFailure.subscribe(function(data) {
        results.innerHTML += ' <span style="color:red;">Connection Error!</span>';
    });

    var actionDispatcher = function(element) {
        switch(element) {
            case 'flush':
                q.flush();
                break;
            case 'dequeue':
                q.dequeue();
                requests.pop();
                queue.innerHTML = requests.toString();
                break;
            case 'pause':
                q.paused();
                break;
            case 'clear':
                q.clear();
                requests = [];
                queue.innerHTML = '';
                break;
        }
    }

    var addRequest = function(request) {
        var data = request.split('-')[1];
        q.add({
            method: 'GET',
            uri: 'blah?id=' + data,
            params: null
        });

        requests.push(data);
        queue.innerHTML = requests.toString();
    }

    items.addEventListener('click', function(e) {
        var e = e || window.event;
        var src = e.target;
        e.preventDefault();
        actionDispatcher(src.id);
    });

    adders.addEventListener('click', function() {
        var e = e || window.event;
        var src = e.target;
        e.preventDefault();
        addRequest(src.id);
    });
}