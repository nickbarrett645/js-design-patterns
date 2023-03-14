// Clone Function

var clone = function(object) {
    function F() {};
    F.prototype = object;
    return new F();
}