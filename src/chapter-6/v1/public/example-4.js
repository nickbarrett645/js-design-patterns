Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};
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
    _$.method('each', function(fn) {
        for(var i = 0; i < this.elements.length; i++) {
            fn.call(this, this.elements[i]);
        }
        return this;
    }).method('setStyle', function(prop, value) {
        this.each(function(el) {
            el.style[prop] = value;
        });
        return this;
    }).method('show', function() {
        var that = this;

        this.each(function(el) {
            that.setStyle('display', 'block');
        });

        return this;
    }).method('addEvent', function(type, fn) {
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
    }).method('addClass', function(className) {
        this.each(function(el) {
            el.classList.add(className)
        });
        return this;
    }).method('removeClass', function(className) {
        this.each(function(el) {
            el.classList.remove(className)
        });
        return this;
    }).method('replaceClass', function(oldClass, newClass) {
        this.each(function(el) {
            el.classList.remove(oldClass);
            el.classList.add(newClass);
        });
        return this;
    }).method('hasClass', function(className) {
        return this.elements.every(function(el) {
            return el.classList.contains(className);
        });
    }).method('getStyle', function(prop) {
        return this.elements.map(function(el) {
            console.log(el.style)
            return el.style[prop]
        });
    }).method('add', function() {
        this.each(function(el) {
            el.append('<div>Hi</div>')
        });
        return this;
    });

    window.installHelper = function(scope, interface) {
        scope[interface] = function() {
            return new _$(arguments);
        }
    }
})();

installHelper(window, '$');

$(window).addEvent('load', function() {
    $('heading').setStyle('color', 'purple');
    $('paragraph3').show();
    $('paragraph1', 'paragraph2').addEvent('click', function(event) {
        $(this).setStyle('color','green')
    });

    $('paragraph2').replaceClass('small', 'big');
    $('paragraph4').removeClass('hidden').addClass('highlight');
    $('hello').add();
    console.log($('paragraph4').hasClass('highlight'));
    console.log($('paragraph4', 'paragraph3').hasClass('highlight'));
    console.log($('heading').getStyle('color'));
});

window.com = window.com || {};
com.example = com.example || {};
com.example.util = com.example.util || {};

installHelper(com.example.util, 'get');

com.example.util.get(window).addEvent('load', function() {
    com.example.util.get('paragraph1').setStyle('color', 'blue');
});




