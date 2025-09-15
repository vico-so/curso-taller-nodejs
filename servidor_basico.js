const http = require('http');

const hostname = '127.0.0.1';

const port = 8080;

const server = http.createServer((req, res) => {

  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');

  res.end('¡Hola, soy tu primer servidor Node.js!\n');

});

server.listen(port, hostname, () => {

  console.log(`Servidor corriendo en http://${hostname}:${port}/`);

});
