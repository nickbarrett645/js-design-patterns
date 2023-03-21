// Using the extend Function

function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}

// Class Person
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

// Class Author
function Author(name, books) {
    Person.call(this, name);
    this.books = books;
}

extend(Author, Person);
Author.prototype.getBooks = function() {
    return this.books;
}

var author = new Author('Ross Harmes', ['Pro JavaScript Design Patters']);

console.log(author.getName())
console.log(author.getBooks().toString());