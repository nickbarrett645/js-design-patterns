/* Interface Class */

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

// Interfaces
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

// CompositeForm class
var CompositeForm = function(id, method, action) {

}

CompositeForm.prototype = {
    add: function() {
        console.log('Adding...');
    },
    remove: function() {
        console.log('Removing...')
    },
    getChild: function() {
        console.log('Getting child');
    },
    save: function() {
        console.log('Saving...')
    }
}

// CompositeForm class
var CompositeFormError = function(id, method, action) {

}

CompositeFormError.prototype = {
    add: function() {
        console.log('Adding...');
    },
    remove: function() {
        console.log('Removing...')
    },
    getChild: function() {
        console.log('Getting child');
    }
}

//CompositeForm.prototype

function addForm(formInstance) {
    Interface.ensureImplements(formInstance, Composite, FormItem);
    console.log('Form instance added.');
}

var formInstance = new CompositeForm();
var formInstanceError = new CompositeFormError();

addForm(formInstance);

try {
    addForm(formInstanceError);
} catch(error) {
    console.log(error.message);
}
