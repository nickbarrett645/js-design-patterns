/* Animation Class */

var Animation = function() {
    // Define initial state here
}

Animation.prototype = {
    start: function() {
        console.log('Starting animation...');
    },

    stop: function() {
        console.log('Stopping animation...');
    }
};

var animation = new Animation();

animation.start();
animation.stop();