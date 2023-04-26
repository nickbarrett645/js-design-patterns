var utility = require('../../../utility/v1/utility');

var Interface = utility.Interface;
var extend = utility.extend;

// BicycleShop Abstract Class
var BicycleShop = function() {}

BicycleShop.prototype = {
    sellBicycle: function(model) {
        var bicycle = this.createBicycle(model);

        bicycle.assemble();
        bicycle.wash();

        return bicycle;
    },
    createBicycle: function() {
        throw new Error('Unsupported operaiton on abstrct class.')
    }
};

// AcmeBicycleShop Class
var AcmeBicycleShop = function() {}

extend(AcmeBicycleShop, BicycleShop);

AcmeBicycleShop.prototype = {
    sellBicycle: function(model) {
        var bicycle = this.createBicycle(model);

        bicycle.assemble();
        bicycle.wash();

        return bicycle;
    },
    createBicycle: function(model)  {
        var bicycle;

        switch(model) {
            case 'The Speedster':
                bicycle = new AcmeSpeedster();
                break;
            case 'The Lowrider':
                bicycle = new AcmeLowRider();
                break;
            case 'The Flatlander':
                bicycle = new AcmeFlatlander();
                break;
            case 'The Comfort Cruiser':
                bicycle = new AcmeComfortCruiser();
                break;
            default:
                bicycle = new AcmeComfortCruiser();
        }

        Interface.ensureImplements(bicycle, Bicycle);

        return bicycle;
    }
};

// AcmeBicycleShop Abstract Class
var GeneralProductsBicycleShop = function() {}

extend(GeneralProductsBicycleShop, BicycleShop);

GeneralProductsBicycleShop.prototype = {
    sellBicycle: function(model) {
        var bicycle = this.createBicycle(model);

        bicycle.assemble();
        bicycle.wash();

        return bicycle;
    },
    createBicycle: function(model)  {
        var bicycle;

        switch(model) {
            case 'The Speedster':
                bicycle = new AcmeSpeedster();
                break;
            case 'The Lowrider':
                bicycle = new AcmeLowRider();
                break;
            case 'The Flatlander':
                bicycle = new AcmeFlatlander();
                break;
            case 'The Comfort Cruiser':
                bicycle = new AcmeComfortCruiser();
                break;
            default:
                bicycle = new AcmeComfortCruiser();
        }

        Interface.ensureImplements(bicycle, Bicycle);

        return bicycle;
    }
};

// Bicycle Interface
var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);

var AcmeSpeedster = function() {
    this.name = 'The Speedster';
}

AcmeSpeedster.prototype = {
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

var AcmeLowRider = function() {
    this.name = 'The Lowrider';
}

AcmeLowRider.prototype = {
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

var AcmeComfortCruiser = function() {
    this.name = 'The Comfort Cruiser';
}

AcmeComfortCruiser.prototype = {
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

var AcmeFlaylander = function() {
    this.name = 'The Flatlander';
}

AcmeFlaylander.prototype = {
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

var GeneralProductsSpeedster = function() {
    this.name = 'The Speedster';
}

GeneralProductsSpeedster.prototype = {
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

var GeneralProductsLowRider = function() {
    this.name = 'The Lowrider';
}

GeneralProductsLowRider.prototype = {
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

var GeneralProductsComfortCruiser = function() {
    this.name = 'The Comfort Cruiser';
}

GeneralProductsComfortCruiser.prototype = {
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

var GeneralProductsFlatlander = function() {
    this.name = 'The Flatlander';
}

GeneralProductsFlatlander.prototype = {
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
var alecsCruisers = new AcmeBicycleShop();
var yourNewBike = alecsCruisers.sellBicycle('The Speedster');

var bobsCruisers = new GeneralProductsBicycleShop();
var yourSecondNewBike = bobsCruisers.sellBicycle('The Speedster');

yourNewBike.ride();
yourSecondNewBike.ride();

try {
    var failShop = new BicycleShop();
    var errorBike = failShop.sellBicycle('The Speedster');
} catch(error) {
    console.log(error.message)
}