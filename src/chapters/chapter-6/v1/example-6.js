var API = function() {
    var name = 'Hello world';

    var setName = function(newName) {
        name = newName;
        return this;
    }

    var getName = function(callback) {
        callback.call(this, name);
        return this;
    }

    return {
        setName: setName,
        getName: getName
    }
};

var o = new API();

o.getName(console.log).setName('Meow').getName(console.log);