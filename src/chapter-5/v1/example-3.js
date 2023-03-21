// GiantCorp Namespace

var GiantCorp = {};

GiantCorp.Common = {
    test: function(func) {
        console.log('A common function used in testing');

        try {
            func()
        } catch(error) {
            console.log(error.message, GiantCorp.ErrorCodes.TEST_ERROR);
        }
    }
};

GiantCorp.ErrorCodes = {
    TEST_ERROR: 20
};

GiantCorp.PageHandler = {
    handlePage: function() {
        if(true) {
            throw Error('Fail');
        }
    }
}

GiantCorp.Common.test(GiantCorp.PageHandler.handlePage);