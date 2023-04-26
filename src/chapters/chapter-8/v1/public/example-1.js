function getBeerId(e) {
    var id = e.target.id;
    asyncRequest('GET', 'beer?id=' + id, function(resp) {
        var beerId = JSON.parse(resp).id;
        console.log('Requested Beer: ' + beerId);
        var el = document.createElement('li');
        el.innerHTML = 'Beer Id: ' + beerId;
        document.getElementById('order-list').appendChild(el)
    })

}

function asyncRequest(method, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) {
            return;
        }
        xhr.status === 200 ? callback(xhr.responseText, xhr.responseXML): callback(xhr.status);
    }

    xhr.open(method, url, true);
    if(method !== 'POST') {
        postVars = null;
    }
    xhr.send(postVars);
}

onload = function() {
    var elements = Array.from(document.getElementsByClassName('beer-button'));
    elements.forEach(function(element) {
        element.addEventListener('click', getBeerId);
    });
}