(function() {
    function _$(els) {
        this.elements = [];
    
        for(var i = 0; i < els.length; i++) {
            var element = els[i];
            if(typeof element === 'string') {
                element = document.getElementById(element);
            }
    
            if(els.length === 1) {
                return element;
            }
            this.elements.push(element);
        }
    
        return this.elements;
    }

    window.$ = function() {
        return new _$(arguments);
    }
})();

onload = function() {
    $('heading').style.color = 'red'
    $('paragraph1', 'paragraph2').forEach(function(element) {
        element.style.color = 'orange';
    });
}