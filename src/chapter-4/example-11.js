// Augment function improved, can add only specified functions
var augment = function(receivingClass, givingClass) {
    if(arguments[2]) {
        for(var i = 2; i < arguments.length; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } else {
        for(methodName in givingClass.prototype) {
            receivingClass.prototype[methodName] = givingClass.prototype[methodName]
        }
    }
}