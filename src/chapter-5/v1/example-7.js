// Singleton as an Object Literal
var MyNamespace = {};
var MyOtherNamespace = {};

MyNamespace.Singleton = {};

// Singleton with Private Members
MyOtherNamespace.Singleton = (function() {
    var privateAttributes1 = false;
    var privateAttributes2 = [1,2,3]
    return {
        publicAttribute1: true,
        publicAttribute2: 10,

        publicMethod1: function() {
            console.log('Hello');
        },

        publicMethod2: function(args) {
            console.log('Goodbye: ', privateAttributes2);
        }
    }
})();

MyOtherNamespace.Singleton.publicMethod1();
MyOtherNamespace.Singleton.publicMethod2();