// Edit In Place using Prototypal Inheritance
var EditInPlaceField = {
    configure: function(id, parent, value) {
        this.id = id;
        this.value = value || 'default value';
        this.parentElement = parent;

        this.createElements(id);
        this.attachEvents();
        this.getText();
    },

    createElements: function(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'Save';
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = 'Cancel';
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    },

    attachEvents: function() {
        var that = this;
        this.staticElement.addEventListener('click', function(){ that.convertToEditable()});
        this.saveButton.addEventListener('click', function(){ that.save()});
        this.cancelButton.addEventListener('click', function(){ that.cancel()});
    },

    convertToEditable: function() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },

    save: function() {
        console.log('saving...');
        var store = getObjectStore(DB_STORE_NAME, 'readwrite');
        var req;
        var that = this;

        try{
            req = store.put(this.getValue(), this.id)
        } catch(e) {
            console.log(e.message);
        }

        req.onsuccess = function(event) {
            console.log('item successfully added');
            that.value = that.getValue();
            that.convertToText();
        }

        req.onerror = function(event) {
            console.error('Error adding: ', this.error);
        }
    },

    cancel: function() {
        this.convertToText();
    },

    convertToText: function() {
        this.staticElement.style.display = 'inline';
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';

        this.setValue(this.value);
    },

    setValue: function(value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },

    getValue: function() {
        return this.fieldElement.value;
    },

    getText: function() {
        var value, query = db
            .transaction(DB_STORE_NAME)
            .objectStore(DB_STORE_NAME)
            .get(this.id);
        query.onsuccess = (event) => {
            if(event.target.result) {
                value = event.target.result;
            } else {
                value = 'Default Text';
            }
            value = event.target.result || 'Default text';
            this.setValue(value);
        }
        query.onerror = (event) => {
            if(event.target.result) {
                value = event.target.result;
            } else {
                value = 'Default text';
            }
            value = event.target.result || 'Default text';
            this.setValue(value)
        };
    }
    
};

var clone = function(object) {
    function F() {};
    F.prototype = object;
    return new F();
}

var EditInPlaceArea = clone(EditInPlaceField);

// Note dont create new object for prototype here...
EditInPlaceArea.createElements = function(id) {
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('p');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    this.fieldElement = document.createElement('textarea');
    this.fieldElement.type = 'text';
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);

    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = 'Save';
    this.containerElement.appendChild(this.saveButton);

    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = 'Cancel';
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
};

EditInPlaceArea.convertToEditable = function() {
    this.staticElement.style.display = 'none';
    this.fieldElement.style.display = 'block';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';

    this.setValue(this.value);
};

EditInPlaceArea.convertToText = function() {
    this.staticElement.style.display = 'block';
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';

    this.setValue(this.value);
};

var DB_NAME = 'edit-text-example';
var DB_VERSION = 1;
var DB_STORE_NAME = 'edit-texts';
var db;
var title;

function initializeElements() {
    var title, paragraph;
    title = clone(EditInPlaceField);
    title.configure('titlePrototype', document.getElementById('parent'))
    paragraph = clone(EditInPlaceArea);
    paragraph.configure('areaPrototype', document.getElementById('parent'))
}

function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        console.log("openDb DONE");
        initializeElements();

    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { autoIncrement: false });
    };
}

function getObjectStore(storeName, mode) {
    var transaction = db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
}

openDb();



