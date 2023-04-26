(function() {
    function _$(els) {
        this.elements = [];
    
        for(var i = 0; i < els.length; i++) {
            var element = els[i];
            if(typeof element === 'string') {
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
    }

    _$.prototype = {
        each: function(fn) {
            for(var i = 0; i < this.elements.length; i++) {
                fn.call(this, this.elements[i]);
            }
            return this;
        },

        setStyle: function(prop, value) {
            this.each(function(el) {
                el.style[prop] = value;
            });
            return this;
        },

        show: function() {
            var that = this;

            this.each(function(el) {
                that.setStyle('display', 'block');
            });

            return this;
        },

        addEvent: function(type, fn) {
            var add = function(el) {
                if(window.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if(window.attachEvent) {
                    el.attachEvent('on'+type, fn);
                }
            };

            this.each(function(el) {
                add(el);
            });

            return this;
        }
    }

    window.$ = function() {
        return new _$(arguments);
    }
})();

$(window).addEvent('load', function() {
    $('heading').setStyle('color', 'purple');
    $('paragraph3').show();
    $('paragraph1', 'paragraph2').addEvent('click', function(event) {
        $(this).setStyle('color','green')
    })
});

