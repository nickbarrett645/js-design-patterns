// Prototypal Inheritance
var clone = require('../utility').clone;

var Person = {
    name: 'default name',
    getName: function() {
        return this.name;
    }
};

var reader = clone(Person);
console.log(reader.getName());
reader.name = 'John Smith';
console.log(reader.getName());

var Author = clone(Person);
Author.books = [];
Author.getBooks = function() {
    return this.books;
}

var author = clone(Author);
author.name = 'Dustin Diaz';
author.books = ['Pro JavaScript Design Patterns'];

console.log(author.getName());
console.log(author.getBooks().join(', '));