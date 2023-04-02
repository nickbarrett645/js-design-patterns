var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');
var fs = require('fs');
var fsPromise = fs.promises;



var host = 'localhost';
var port = 8000;
var directoryName = '/public';
var types = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    json: 'application/json',
    xml: 'application/xml',
};

var root = path.normalize(path.resolve(__dirname + directoryName));

var requestListner = (req, res) => {
    console.log(`${req.method} ${req.url}`);
  
    var extension = path.extname(req.url).slice(1);
    var type = extension ? types[extension] : types.json;
    var supportedExtension = Boolean(type);
    var queryData = url.parse(req.url, true).query;

    if (!supportedExtension) {
      console.log('here1');
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
      return;
    }
  
    let fileName = req.url;
    if (req.url === '/') {
      fileName = 'index.html';
      extension = 'html';
      type = types[extension];
    }

    if (!extension && queryData.proxy) {
        var request = https.get(queryData.proxy, function(response) {
          let data = '';
          response.on('data', function(chunk) {
            data = data + chunk.toString();
          });

          response.on('end', function() {
            res.writeHead(200, {'Content-Type': type});
            res.end(data);
          });

        });

        request.on('error', function(error) {
          console.log(error);
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404: Failed to get feed');
        });
        
    } else if(type === types.json && queryData.id) {
      res.writeHead(200, {'Content-Type': types.json});
      res.end(JSON.stringify({id: queryData.id, data: 'test data'}))
    } else {
      var filePath = path.join(root, fileName);
      var isPathUnderRoot = path
        .normalize(path.resolve(filePath))
        .startsWith(root);
  
      if (!isPathUnderRoot) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404: File not found');
        return;
      }
  
      fsPromise.readFile(filePath)
          .then(data => {
              res.writeHead(200, { 'Content-Type': type });
              res.end(data);
          })
          .catch(err => {
            console.log('here2');
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('404: File not found');
          });
      }
  }

var server = http.createServer(requestListner);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
