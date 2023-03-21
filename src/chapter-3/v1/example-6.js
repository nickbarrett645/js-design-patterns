/* Book Class*/
// Using closure now all private attributes are truly private
var Interface = require('../../v1/utility').Interface;

var Publication = new Interface('Publication', ['getISBN', 'setISBN', 'getTitle',
                                'setTitle', 'getAuthor', 'setAuthor', 'display']);


var Book = function(newISBN, newTitle, newAuthor) { // implemenets Publication
    
    // Private Attributes
    var isbn, title, author;

    // Private method
    function checkISBN(isbn) {
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
    }

    // Priviledged methods
    this.getISBN = function() {
        return isbn;
    };

    this.setISBN = function(newISBN) {
        if(!checkISBN(newISBN)) {
            throw new Error('Book: Invalid ISBN');
        }
        isbn = newISBN;
    };

    this.getTitle = function() {
        return title;
    };

    this.setTitle = function(newTitle) {
        title = newTitle || 'No Title Specified';
    };

    this.getAuthor = function() {
        return author;
    };

    this.setAuthor = function(newAuthor) {
        author = newAuthor || 'No Author Specified';
    };

    // When using this structure the interface check needs to be moved down after the methods are defined
    Interface.ensureImplements(this, Publication);

    this.setISBN(newISBN);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
    
}

Book.prototype = {
    display: function() {
        console.log('ISBN: ' + this.getISBN() + ' ' + this.getTitle() + ' by ' + this.getAuthor());
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

// Trying to access private method
try {
    newBook13.checkISBN();
} catch(error) {
    console.log(error.message);
}

// Trying to access private attribute
console.log(newBook13.title);