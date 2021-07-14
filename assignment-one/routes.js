const fs = require('fs');

const serverHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const body = [];
  if (url === '/') {
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>assignment-one</title></head>');
    res.write(
      '<body><h1>Hello from home page</h1> <form action="/create-user" method="POST"><input type="text" name="student"/> <button type="submit">Submit</button></form>  </body>'
    );
    res.write('</html>');
  }
  if (url === '/create-user' && method === 'POST') {
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const bufferData = Buffer.concat(body).toString();
      const userName = bufferData.split('=')[1];
      console.log('userName : ', userName);
      return res.end();
    });
  }

  if (url === '/users') {
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>assignment-one</title></head>');
    res.write(
      '<body><ul><li>User One</li> <li>User Two</li></ul> <li>User Three</li></ul></body>'
    );
    res.write('</html>');
  }
};

module.exports = serverHandler;
