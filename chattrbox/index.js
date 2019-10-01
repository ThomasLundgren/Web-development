const http = require('http');
const readFile = require('./readfile')('app');
const wss = require('./websockets-server');

const server = http.createServer(function (req, res) {
    console.log('Responding to a request.');

    readFile(req, res);
});
server.listen(3000);
