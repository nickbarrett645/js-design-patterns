// Branching Example

var MyNamespace = {};
// Uncomment to use objectA
var test = true;

// Uncomment to use objectB
//var test = false;

MyNamespace.Singleton = (function() {
    var objectA = {
        method1: function() {
            console.log('From A');
        }
    };

    var objectB = {
        method1: function() {
            console.log('From B');
        }
    };

    return test ? objectA: objectB;
})();

MyNamespace.Singleton.method1();
