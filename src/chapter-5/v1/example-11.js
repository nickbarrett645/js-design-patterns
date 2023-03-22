// SimpleXHR Factory Singleton

var SimpleXhrFactory = (function() {
    var standard = {
        creaXhrObject: function() {
            return new XMLHttpRequest();
        }
    };

    var activeXNew = {
        creaXhrObject: function() {
            return ActiveXObject('Msxml2.XMLHTTP');
        }
    };

    var activeXOld = {
        creaXhrObject: function() {
            return ActiveXObject('Microsoft.XMLHTTP');
        }
    }

    var testObject;

    try {
        testObject = standard.creaXhrObject();
        return standard;
    } catch(error) {
        try {
            testObject = activeXNew.creaXhrObject();
            return activeXNew;
        } catch(error) {
            try {
                testObject = activeXOld.creaXhrObject();
                return activeXOld
            } catch(error) {
                console.log('No XHR object fond in this environment.');
            }
        }
    }

})();