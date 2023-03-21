// ResultFormatter class, using the interface implementation
var Interface = require('../../v1/utility').Interface;
var SUCCESS = 'SUCCESS';
var INCORRECT = 'INCORRECT';
var CHECK_MARK = '√'
var INCORRECT_MARK = 'X'

var ResultSet = new Interface('ResultSet', ['getDate', 'getResults']);

var TestResult = function() {

}

TestResult.prototype = {
    getDate: function() {
        return new Date();
    },
    getResults: function() {
        return [SUCCESS, SUCCESS, SUCCESS, INCORRECT, SUCCESS];
    }
}

var TestResultError = function() {

}

TestResultError.prototype = {
    getDate: function() {
        return new Date();
    }
}
var ResultFormatter = function(resultsObject) {
    // Now just check the Interface
    Interface.ensureImplements(resultsObject, ResultSet)
    this.resultsObject = resultsObject;
}

ResultFormatter.prototype.renderResults = function() {
    var dateOfTest = this.resultsObject.getDate();
    var resultsArray = this.resultsObject.getResults();
    var resultsContainer = {};

    var resultsHeader = 'Test Results from ' + dateOfTest.toUTCString();
    var resultsList = [];

    for(var i = 0; i < resultsArray.length; i++) {
        if(resultsArray[i] === SUCCESS) {
            resultsList.push(CHECK_MARK)
        } else {
            resultsList.push(INCORRECT_MARK)
        }
    }
    
    resultsContainer.header = resultsHeader;
    resultsContainer.list = resultsList;
    
    console.log(resultsContainer.header);
    console.log(resultsContainer.list.toString());
}

var result = new TestResult();
var formatter = new ResultFormatter(result);
formatter.renderResults();

var resultError = new TestResultError();
try {
    var formatterError = new ResultFormatter(resultError);
    formatterError.renderResults();
} catch(error) {
    console.log(error.message)
}