/* Class Person */

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = {
    getName: function() {
        console.log(this.name);
    },

    getAge: function() {
        console.log(this.age);
    }
}

var alice = new Person('Alice', 93);
var bob = new Person('Bob', 90);

/* Modify the class after instantiation */

Person.prototype.getGreeting = function() {
    console.log('Hi ' + this.name + '!');
}

/* Modify a specific instance */
alice.goodMorning = function(person) {
    console.log('Goodmorning ' + person.name + '.')
}

bob.getGreeting();
alice.goodMorning(bob);

try {
    bob.goodMorning();
} catch(e) {
    console.log('Bob does not have the good morning function.')
}