var Interface = require('../../../utility/v1/utility').Interface;

// BicycleShop Class
var BicycleShop = function() {}

BicycleShop.prototype = {
    sellBicycle: function(model) {
        var bicycle = BicycleFactory.createBicycle(model);

        bicycle.assemble();
        bicycle.wash();

        return bicycle;
    }
};

// Bicycle Interface
var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);

var BicycleFactory = {
    createBicycle: function(model)  {
        var bicycle;

        switch(model) {
            case 'The Speedster':
                bicycle = new Speedster();
                break;
            case 'The Lowrider':
                bicycle = new LowRider();
                break;
            case 'The Flatlander':
                bicycle = new Flatlander();
                break;
            case 'The Comfort Cruiser':
                bicycle = new ComfortCruiser();
                break;
            default:
                bicycle = new ComfortCruiser();
        }

        Interface.ensureImplements(bicycle, Bicycle);

        
        
        return bicycle;
    }
}

var Speedster = function() {
    this.name = 'The Speedster';
}

Speedster.prototype = {
    assemble: function() {
        console.log('Assembling: ' + this.name);
    },
    wash: function() {
        console.log('Washing: ', this.name);
    },
    ride: function() {
        console.log('Riding: ', this.name);
    },
    repair: function() {
        console.log('Repairing: ', this.name);
    }
};

var LowRider = function() {
    this.name = 'The Lowrider';
}

LowRider.prototype = {
    assemble: function() {
        console.log('Assembling: ' + this.name);
    },
    wash: function() {
        console.log('Washing: ', this.name);
    },
    ride: function() {
        console.log('Riding: ', this.name);
    },
    repair: function() {
        console.log('Repairing: ', this.name);
    }
};

var ComfortCruiser = function() {
    this.name = 'The Comfort Cruiser';
}

ComfortCruiser.prototype = {
    assemble: function() {
        console.log('Assembling: ' + this.name);
    },
    wash: function() {
        console.log('Washing: ', this.name);
    },
    ride: function() {
        console.log('Riding: ', this.name);
    },
    repair: function() {
        console.log('Repairing: ', this.name);
    }
};

var Flaylander = function() {
    this.name = 'The Flatlander';
}

Flaylander.prototype = {
    assemble: function() {
        console.log('Assembling: ' + this.name);
    },
    wash: function() {
        console.log('Washing: ', this.name);
    },
    ride: function() {
        console.log('Riding: ', this.name);
    },
    repair: function() {
        console.log('Repairing: ', this.name);
    }
};
var californiaCruisers = new BicycleShop();
var yourNewBike = californiaCruisers.sellBicycle('The Speedster');

yourNewBike.ride();