const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;



const host = 'localhost';
const port = 8000;
const directoryName = '/public';
const types = {
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

const root = path.normalize(path.resolve(__dirname + directoryName));

const requestListner = (req, res) => {
    console.log(`${req.method} ${req.url}`);
  
    const extension = path.extname(req.url).slice(1);
    const type = extension ? types[extension] : types.html;
    const supportedExtension = Boolean(type);
  
    if (!supportedExtension) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
      return;
    }
  
    let fileName = req.url;
    if (req.url === '/') fileName = 'index.html';
    else if (!extension) {
        fsPromise.access(path.join(root, req.url + '.html'), fs.constants.F_OK)
            .then(() => fileName = req.url + '.html')
            .catch(() => console.log('Cannot be accessed'));
    }
  
    const filePath = path.join(root, fileName);
    const isPathUnderRoot = path
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
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404: File not found');
        });
  }

const server = http.createServer(requestListner);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
