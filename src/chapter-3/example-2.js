/* Book Class*/
// Still wide open but some more added validation

var Book = function(isbn, title, author) {
    if(!this.checkISBN(isbn)) {
        throw new Error('Book: Invalid ISBN');
    }
    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype = {
    checkISBN: function(isbn) {
        if(isbn === undefined || typeof isbn !== 'string') {
            return false;
        }
        isbn = isbn.replace(/-/g, '');
        console.log(isbn.length)
        console.log(isbn)
        if(isbn.length !== 10 && isbn.length !== 13) {
            return false;
        }

        var sum = 0;
        if(isbn.length === 10) {
            if(!isbn.match(/\d{10}/)) {
                return false;
            }

            for(var i = 0; i < 9; i++) {
                sum += isbn.charAt(i) * (10-i);
            }
            var checksum = sum % 11;
            if(checksum === 10) {
                checksum = 'X';
            }
            if(isbn.charAt(9) !== checksum) {
                return false;
            }
        } else {
            if(!isbn.match(/\d{13}/)) {
                return false;
            }
            for(var i = 0; i < 12; i++) {
                sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3)
            }
            var checksum = sum % 10;
            console.log(checksum);
            if(isbn.charAt(12) !== checksum) {
                console.log('bad')
                return false;
            }
        }

        return true;
    },
    display: function() {
        console.log('ISBN: ' + this.isbn + ' ' + this.title + ' by ' + this.author);
    }
}

var newBook = new Book('978-3423-214-124', 'The Hobbit', 'J.R.R. Tolkien');

newBook.display();