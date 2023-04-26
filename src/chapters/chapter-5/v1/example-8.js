// DataParser singleton now using true private methods
var GiantCorp = {};

GiantCorp.DataParser = (function() {
    // Private Attribute
    var whitespaceRegex = /\s+/;
    // Private methods
    function stripWhitespace(str) {
        return str.replace(whitespaceRegex,'');
    }
    function stringSplit(str, delimiter) {
        return str.split(delimiter);
    }

    // Public methods
    return {
        stringToArray: function(str, delimiter, stripWS) {
            if(stripWS) {
                str = stripWhitespace(str);
            }
    
            var outputArray = stringSplit(str, delimiter);
            return outputArray;
        }
    }
})();

var testStr = 'This,is,a,test   ';
console.log(GiantCorp.DataParser.stringToArray(testStr, ',', true))