// Mixin Class
var clone = require('../utility').clone;
var augment = function(receivingClass, givingClass) {
    console.log(receivingClass.prototype)
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

var Person = {
    name: 'default name',
    getName: function() {
        return this.name;
    }
};

var Author = clone(Person);
Author.books = [];
Author.getBooks = function() {
    return this.books;
}

augment(Author, Mixin);

var author = new Author('Ross Harmes', ['Pro JavaScript Design Patters']);
console.log(author.serialize());

