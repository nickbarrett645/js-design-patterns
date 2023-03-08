// An addition to example 4 so that the method delcarions can be changed by returning this

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};

var Animation = function() {
    // Declare inital state here
};

Animation.method('start', function() {
    console.log('Starting animation...');
}).method('stop', function() {
    console.log('Stopping animation...');
});

var animation = new Animation();

animation.start();
animation.stop();