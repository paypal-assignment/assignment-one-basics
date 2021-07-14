const http = require('http');
const serverListener = require('./routes.js');

let server = http.createServer(serverListener);
server.listen(3000);
