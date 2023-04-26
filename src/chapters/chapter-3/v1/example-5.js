// Variables are accessible to their nested functions
function foo() {
    var a = 10;

    function bar() {
        a *= 2;
    }

    bar();

    return a;
}

console.log(foo());

// just noting a different way of writing this
function foo2() {
    var a = 10;

    bar = function() {
        a *= 2;
    }

    this.bar();

    return a;
}

console.log(foo2());

// An example of closure
function foo3() {
    var a = 10;

    function bar() {
        a *= 2;
        return a;
    }

    return bar;
}

var baz = foo3();
console.log(baz()); // outputs 20
console.log(baz()); // outputs 40
console.log(baz()); // outputs 80

var blat = foo3();
console.log(blat()); // outputs 20