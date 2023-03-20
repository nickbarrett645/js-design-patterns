// Edit In Place using Classical Inheritance

function EditInPlaceField(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElements(id);
    this.attachEvents();
}

EditInPlaceField.prototype = {
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
            req = store.put(this.getValue(), 1)
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
    }
};

var DB_NAME = 'edit-text-example';
var DB_VERSION = 1;
var DB_STORE_NAME = 'edit-texts';
var db;
var title;

function getTitle() {
    var value;
    var query = db
    .transaction(DB_STORE_NAME)
    .objectStore(DB_STORE_NAME)
    .get(1);
    query.onsuccess = (event) => {
        if(event.target.result) {
            value = event.target.result;
        } else {
            value = 'Default Text';
        }
        value = event.target.result || 'Default text';
        title = new EditInPlaceField('titleClassical', document.getElementById('parent'), value)
    }
    query.onerror = (event) => {
        if(event.target.result) {
            value = event.target.result;
        } else {
            value = 'Default text';
        }
        value = event.target.result || 'Default text';
        title = new EditInPlaceField('titleClassical', document.getElementById('parent'), event.target.result)
    };
}

function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        console.log("openDb DONE");
        getTitle();

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