// Classical Inheritance

// Class Person
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

var reader = new Person('John Smith');

console.log(reader.getName());

// Class Author
function Author(name, books) {
    Person.call(this, name);
    this.books = books;
}

Author.prototype = new Person();
Author.prototype.constructor = Author;
Author.prototype.getBooks = function() {
    return this.books;
}

var author = new Author('Ross Harmes', ['Pro JavaScript Design Patters']);

console.log(author.getName())
console.log(author.getBooks().toString());