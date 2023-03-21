/* Book Class*/
// Wide open

var Book = function(isbn, title, author) {
    if(isbn === undefined) {
        throw new Error('Book constructor requires an isbn');
    }
    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype.display = function() {
    console.log('ISBN: ' + this.isbn + ' ' + this.title + ' by ' + this.author);
}

var newBook = new Book('123', 'Story', 'Bob');

newBook.display();