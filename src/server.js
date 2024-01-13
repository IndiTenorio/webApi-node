import http from 'node:http';

const PORT = 3838;

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middlewares
  const buffers = [];
  for await (const chunck of req) {
    buffers.push(chunck);
  }

  const buffersString = Buffer.concat(buffers).toString();
  try {
    req.body = JSON.parse(buffersString);
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');

  // rotas
  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push(req.body);
    return res.writeHead(201).end();
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`listening at http://localhost:/${PORT}`);
});
