// Example of an IIFE

(function(foo) {
    var bar = 5;
    console.log(foo * bar);
})(10)

var baz = (function(foo) {
    var bar = 5;
    return function() {
        console.log(foo * bar);
    }
})(10)

baz();