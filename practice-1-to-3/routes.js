const fs = require('fs');
let body = [];

const serverListener = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head> <title> project</title></head');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const bufferBody = Buffer.concat(body).toString();
      const message = bufferBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
      //    let data = JSON.parse(message);
      //    res.write(data);
      //    res.end();
      //  } catch (err) {
      //    res.statusCode = 404;
      //    console.error(err);
      //  }
    });
  }

  res.setHeader('content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title> project two</title></head');
  res.write('<body><h1>Hello from message</h1></body>');
  res.write('</html>');
  res.end();
};
module.exports = serverListener;
