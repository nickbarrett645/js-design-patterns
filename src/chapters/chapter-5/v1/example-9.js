// Singleton with Lazy loading
var MyNamespace = {};

MyNamespace.Singleton = {};

// Singleton with Private Members
MyNamespace.Singleton = (function() {
    var uniqueInstance;

    function constructor() {
        return {
            publicMethod1: function() {
                console.log('Hello');
            }
        }
    }
    return {
        getInstance: function() {
            if(!uniqueInstance) {
                uniqueInstance = constructor();
            }

            return uniqueInstance;
        }
    }
})();

MyNamespace.Singleton.getInstance().publicMethod1();