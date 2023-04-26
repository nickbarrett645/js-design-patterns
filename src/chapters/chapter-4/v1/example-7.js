// Dealing with child object fields
var clone = require('../../utility/v1/utility').clone;

var CompoundObject = {
    string1: 'default value',
    childObject: {
        bool: true,
        num: 10
    }
};

var compoundObjectClone = clone(CompoundObject);
var compoundObjectClone2 = clone(CompoundObject);
// Recreating the entire object
compoundObjectClone.childObject = {
    bool: true,
    num: 5
};
// Objects have now have different fields
console.log(compoundObjectClone.childObject.num);
console.log(compoundObjectClone2.childObject.num);