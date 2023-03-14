// Dealing with child object fields
var clone = require('../utility').clone;

var CompoundObject = {
    string1: 'default value',
    createChildObject: function() {
        return  {
            bool: true,
            num: 10
        };
    }
};

CompoundObject.childObject = CompoundObject.createChildObject();
console.log(CompoundObject.childObject);

var compoundObjectClone = clone(CompoundObject);
var compoundObjectClone2 = clone(CompoundObject);
compoundObjectClone.childObject = CompoundObject.createChildObject();
compoundObjectClone2.childObject = CompoundObject.createChildObject();
// Recreating the entire object
compoundObjectClone.childObject.num = 5;
// Objects have now have different fields
console.log(compoundObjectClone.childObject.num);
console.log(compoundObjectClone2.childObject.num);