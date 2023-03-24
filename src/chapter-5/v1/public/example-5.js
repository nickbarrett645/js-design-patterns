// RegPage singleton, page handler object

var GiantCorp = {};

GiantCorp.RegPage = {
    // Constants
    FORM_ID: 'reg-form',
    OUTPUT_ID: 'reg-results',
    ERROR_ID: 'reg-error',

    handlSubmit: function(event) {
        event.preventDefault();
        var data = {};
        var inputs = GiantCorp.RegPage.formEl.getElementsByTagName('input');

        for(var i = 0; i < inputs.length; i++) {
            data[inputs[i].name] = inputs[i].value;
            if(inputs[i].type === 'text') {
                inputs[i].value = '';
            }
            
        }

        GiantCorp.RegPage.sendRegistration(data);
    },

    sendRegistration: function(data) {
        if(data.name && data.job) {
           GiantCorp.RegPage.displayResult(data);
        } else {
            GiantCorp.RegPage.displayError();
        }
    },

    displayResult: function(response) {
        GiantCorp.RegPage.errorEl.innerHTML = '';
        GiantCorp.RegPage.outputEl.innerHTML = '<p>Thanks for registering ' + response.name + ': ' + response.job + '</p>';
    },

    displayError: function() {
        GiantCorp.RegPage.outputEl.innerHTML = '';
        GiantCorp.RegPage.errorEl.innerHTML = '<p>Error missing fields</p>';
    },

    init: function() {
        GiantCorp.RegPage.formEl = document.getElementById(GiantCorp.RegPage.FORM_ID);
        GiantCorp.RegPage.outputEl = document.getElementById(GiantCorp.RegPage.OUTPUT_ID);
        GiantCorp.RegPage.errorEl = document.getElementById(GiantCorp.RegPage.ERROR_ID);

        GiantCorp.RegPage.formEl.addEventListener('submit', GiantCorp.RegPage.handlSubmit);
    }
};

onload = function(event) {
    GiantCorp.RegPage.init();
}