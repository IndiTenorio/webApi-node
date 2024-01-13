import http from 'node:http';
import { getBody } from './middlewares/json.js';

const PORT = 3838;

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middlewares
  await getBody(req, res);

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
