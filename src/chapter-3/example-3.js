var Interface = require('../utility.js').Interface;

var Publication = new Interface('Publication', ['getISBN', 'setISBN', 'getTitle',
                        'setTitle', 'getAuthor', 'setAuthor', 'display']);
var Book = function(isbn, title, author) {
    this.setISBN(isbn);
    this.setTitle(title);
    this.setAuthor(author);
}

Book.prototype = {
    checkISBN: function(isbn) {
        if(isbn === undefined || typeof isbn !== 'string') {
            return false;
        }

        isbn = isbn.replace(/-/, '');
        if(isbn.length !== 10 || isbn.length !== 13) {
            return false;
        }

        var sum = 0;
        if(isbn.length === 10) {
            if(!isbn.match(/^\d{9}$/)) {
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
            if(!isbn.match(/^\d{12}$/)) {
                return false;
            }
            for(var i = 0; i < 12; i++) {
                sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3)
            }
            var checksum = sum % 10;
            if(isbn.charAt(12) !== checksum) {
                return false;
            }
        }

        return true;
    },
    display: function() {
        console.log('ISBN: ' + this.isbn + ' ' + this.title + ' by ' + this.author);
    }
}