// DataParser singleton, converts character delimited strings into arrays
var GiantCorp = {};

GiantCorp.DataParser = {
    // Private methods
    _stripWhitespace: function(str) {
        return str.replace(/\s+/,'');
    },
    _stringSplit: function(str, delimiter) {
        return str.split(delimiter);
    },

    // Public methods
    stringToArray: function(str, delimiter, stripWS) {
        if(stripWS) {
            str = this._stripWhitespace(str);
        }

        var outputArray = this._stringSplit(str, delimiter);
        return outputArray;
    }
}

var testStr = 'This,is,a,test   ';

console.log(GiantCorp.DataParser.stringToArray(testStr, ',', true));