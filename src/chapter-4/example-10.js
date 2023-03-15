// Mixin Class
var extend = require('../utility').extend;

var augment = function(receivingClass, givingClass) {
    for(methodName in givingClass.prototype) {
        if(!receivingClass.prototype[methodName]) {
            receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
    }
}
var Mixin = function() {

}

Mixin.prototype = {
    serialize: function() {
        var output = [];
        for(key in this) {
            output.push(key + ': ' + this[key]);
        }
        return output.join(', ');
    }
};

// Class Person
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

// Class Author
function Author(name, books) {
    Author.superClass.constructor.call(this, name);
    this.books = books;
}

extend(Author, Person);
Author.prototype.getBooks = function() {
    return this.books;
}
Author.prototype.getName = function() {
    var name = Author.superClass.getName.call(this);
    return name + ', Author of ' + this.getBooks().join(', ');
}

augment(Author,Mixin)

var author = new Author('Ross Harmes', ['Pro JavaScript Design Patters']);
console.log(author.serialize());

