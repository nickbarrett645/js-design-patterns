// Add a method to the Function object that can be used to declare methods

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
};

var Animation = function() {
    // Declare inital state here
};

Animation.method('start', function() {
    console.log('Starting animation...');
});

Animation.method('stop', function() {
    console.log('Stopping animation...');
});

var animation = new Animation();

animation.start();
animation.stop();