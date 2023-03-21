// Constant Example
/* The code example in the book is completely wrong from what I can tell.
 * The syntax is incorrect for declaring the function and then its not available 
 * statically on the class. You can only add static attributes available on the function after
 * it has been delcared. You can hide them so their values cannot be changed but you need
 * a public function on the prototype to access them and thus will need to instantiate an
 * to access them.
*/ 

var Example = (function() {
    // Constants are private static attributes
    var UPPER_BOUND = 100;

    getUPPER_BOUND = function() {
        return UPPER_BOUND;
    };

    return function(constructorArgs) {
        this.checkUpperBound = function(num) {
            return num < getUPPER_BOUND();
        }
    }
})();

var example = new Example();

console.log(example.checkUpperBound(8));


var Example2 = (function() {
    var constants = {
        UPPER_BOUND: 100,
        LOWER_BOUND: -100
    };

    return function(constructorArgs) {
        this.getConstant = function(name) {
            return constants[name];
        }
    }
})();

var example2 = new Example2();

console.log(example2.getConstant('LOWER_BOUND'));

var Example3 = function() {
    
}

Example3.getUPPER_BOUND = function() {
    var UPPER_BOUND = 100;
    return UPPER_BOUND
}

console.log(Example3.getUPPER_BOUND());