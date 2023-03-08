// Emulating with attribute checking
/*
interface Compsite {
    function add(child);
    function remove(child);
    function getChild(index);
}

interface FormItem {
    function save();
}
*/

var CompositeForm = function(id, method, action) {
    this.implementsInterfaces = ['Composite', 'FormItem'];
}

var CompositeFormError = function(id, method, action) {
    this.implementsInterfaces = ['Composite'];
}

function addForm(formInstance) {
    if(!implements(formInstance, 'Composite', 'FormItem')) {
        throw new Error('Object does not implement ths required interface.');
    }

    console.log('Form Item added...')
}

function implements(object) {
    for(var i = 1; i < arguments.length; i++) {
        var interfaceName = arguments[i];
        var interfaceFound = false;

        for(var j = 0; j < object.implementsInterfaces.length; j++) {
            if(object.implementsInterfaces[j] === interfaceName) {
                interfaceFound = true;
                break;
            }
        }

        if(!interfaceFound) {
            return false;
        }
    }

    return true;
}

var formInstance = new CompositeForm(1, 'method', 'action');
var formInstanceError = new CompositeFormError(1, 'method', 'action');

addForm(formInstance);

// Will throw
try {
    addForm(formInstanceError);
} catch(error) {
    console.log(error.message);
}

