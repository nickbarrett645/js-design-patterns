// Decalred globally

function findProduct() {
    console.log('Here it is');
}

var resetProduct = 'resetProduct';
var findProduct = 'findProduct'; // now the findProduct function has been overwritten

try {
    findProduct();
} catch(error) {
    console.log(error.message);
}

// Use a namespace
var MyNamespace = {
    findProduct: function() {
        console.log('Found it again');
    }
}

MyNamespace.findProduct();