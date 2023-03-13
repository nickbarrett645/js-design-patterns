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
        if(isbn.length !== 10 && isbn.length !== 13) {
            return false;
        }

        var sum = 0;
        if(isbn.length === 10) {
            if(!isbn.match(/\d{10}/)) {
                return false;
            }

            for(var i = 0; i < 9; i++) {
                sum += isbn.charAt(i) * (10 - i);
            }
            var checksum = 11 - sum % 11;
            if(checksum === 10) {
                checksum = 'X';
            }
            if(parseInt(isbn.charAt(9),10) !== checksum) {
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
            if(checksum !== 0) {
                checksum = 10 - checksum;
            }

            if(parseInt(isbn.charAt(12),10) !== checksum) {
                return false;
            }
        }

        return true;
    },
    display: function() {
        console.log('ISBN: ' + this.isbn + ' ' + this.title + ' by ' + this.author);
    }
}

// ISBN-10
var newBook10 = new Book('0618260307', 'The Hobbit', 'J.R.R Tolkien');
newBook10.display();
try {
    var error10 = new Book('0618260308', 'The Hobbit', 'J.R.R Tolkien');
} catch(error) {
    console.log(error.message);
}

// ISBN-13
var newBook13 = new Book('978026110221-7', 'The Hobbit', 'J.R.R. Tolkien');
newBook13.display();

try {
    var error13 = new Book('978026110221-8', 'The Hobbit', 'J.R.R Tolkien');
} catch(error) {
    console.log(error.message);
}