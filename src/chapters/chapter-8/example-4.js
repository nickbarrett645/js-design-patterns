var Class1 = function(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

var Class2 = function(d) {
    this.d = d;
}

var BridgeClass = function(a, b, c, d) {
    this.one = new Class1(a, b, c);
    this.two = new Class2(d);
}

var bridge = new BridgeClass(1, 2, 3, 4);

console.log(bridge.one.a);
console.log(bridge.one.b);
console.log(bridge.one.c);
console.log(bridge.two.d);