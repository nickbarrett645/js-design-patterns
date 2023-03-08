// Defining Interfaces through comments
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

var CompositeForm = function(id, method, action) { // implments Composite, FormItem

}

// Implement the Composite Interface
CompositeForm.prototype.add = function(child) {
    console.log('Adding child...');
}

CompositeForm.prototype.remove = function(child) {
    console.log('Removing child...');
}

CompositeForm.prototype.getChild = function(index) {
    console.log('Getting child...');
}

// Implement the FormItem Interface
CompositeForm.prototype.save = function() {
    console.log('Saving...');
}

var formInstance = new CompositeForm(1, 'add', 'add');

formInstance.add();
formInstance.save();
formInstance.getChild();
formInstance.remove();