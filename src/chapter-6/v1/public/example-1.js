function $() {
    var elements = [];

    for(var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if(typeof element === 'string') {
            element = document.getElementById(element);
        }

        if(arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }

    return elements;
}

onload = function() {
    $('heading').style.color = 'blue'
    $('paragraph1', 'paragraph2').forEach(function(element) {
        element.style.color = 'green';
    });
}