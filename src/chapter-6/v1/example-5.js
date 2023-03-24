var API = function() {
    var name = 'Hello world';

    var setName = function(newName) {
        name = newName;
        return this;
    }

    var getName = function() {
        return name;
    }

    return {
        setName: setName,
        getName: getName
    }
};

var o = new API();

console.log(o.getName());
console.log(o.setName('Meow').getName());