/* Animation Class */

var Animation = function() {
    //Initial state can be defined here
}

Animation.prototype.start = function() {
    console.log('Starting animation...');
}

Animation.prototype.stop = function() {
    console.log('Stoppping animation...');
}

var animation = new Animation();

animation.start()
animation.stop();