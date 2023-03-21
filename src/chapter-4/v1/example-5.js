// Prototypal Inheritance
var clone = require('../../v1/utility').clone;

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

var author = clone(Author);
var author2 = clone(Author);
// Same default name
console.log(author.getName());
console.log(author2.getName());
// Now author has a different name
author.name = 'Dustin Diaz';
console.log(author.getName());
console.log(author2.getName());
// Same default empty list of books
console.log(author.getBooks().join(', '));
console.log(author2.getBooks().join(', '));
// Pushing a book onto authors list
author.books.push('Pro JavaScript Design Patterns');
// Both author and author2 have the same book list now
console.log(author.getBooks().join(', '));
console.log(author2.getBooks().join(', '));
// Resetting the books field on author to not affect the prototype
author.books = [];
author.books.push('Another book');
// Now they have different books
console.log(author.getBooks().join(', '));
console.log(author2.getBooks().join(', '));