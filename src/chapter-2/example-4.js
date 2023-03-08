var Interface = require('../utility.js').Interface

var DynamicMap = new Interface('DynamicMap', ['centerOnPoint', 'zoom', 'draw']);

var MyMap = function() {

}

MyMap.prototype = {
    centerOnPoint: function(pointA, pointB) {
        console.log('Centering on: ' + pointA + ' ' + pointB);
    },
    zoom: function(magnification) {
        console.log('Zooming in: ' + magnification + 'x');
    },
    draw: function() {
        console.log('Drawing...')
    }
}

function displayRoute(mapInstance) {
    Interface.ensureImplements(mapInstance, DynamicMap);
    mapInstance.centerOnPoint(12,34);
    mapInstance.zoom(5);
    mapInstance.draw();
}

var mapInstance = new MyMap();

displayRoute(mapInstance);

