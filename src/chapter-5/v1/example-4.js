// Generica Page Object

var Namespace = {};

Namespace.PageName = {
    // Page Constants
    CONSTANT_1: true,
    CONSTANT_2: 10,

    // Page Methods
    method1: function() {
        console.log('Hello')
    },
    method2: function() {
        console.log('Goodbye')
    },

    // Initialization method
    init: function() {
        console.log('Initializing...')
    }
};

Namespace.PageName.init();
Namespace.PageName.method1();
Namespace.PageName.method2();