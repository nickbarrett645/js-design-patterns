// ResultFormatter class, showing the problem with just checking instanceof
var SUCCESS = 'SUCCESS';
var INCORRECT = 'INCORRECT';
var CHECK_MARK = '√'
var INCORRECT_MARK = 'X'

var TestResult = function() {

}

TestResult.prototype = {
    getDate: function() {
        return new Date();
    }
    // Misssing the getResults function
}
var ResultFormatter = function(resultsObject) {
    if(!(resultsObject instanceof TestResult)) {
        throw new Error('ResultsFormatter: constructor requires an instance ' +
        'of TestResult as an argument');
    }
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

try {
    formatter.renderResults();
} catch(error) {
    console.log(error.message);
}
