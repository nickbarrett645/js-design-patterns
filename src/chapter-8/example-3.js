var Public = function() {
    var secret = 3;

    this.privilegedGetter = function() {
        return secret;
    }
}

var o = new Public();

// Will be undefined
console.log(o.secret);

console.log(o.privilegedGetter());