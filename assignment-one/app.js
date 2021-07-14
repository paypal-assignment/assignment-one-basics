const http = require('http');

const serverHandler = require('./routes.js');

let server = http.createServer(serverHandler);

server.listen(3001);
