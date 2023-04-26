// Basic Singleton

var Singleton = {
    attribute1: true,
    attribute2: 10,
    method1: function() {
        console.log('Hello');
    },
    method2: function() {
        console.log('Goodbye')
    }
};

Singleton.method1();
Singleton.method2();