import http from 'node:http';
import { getBody } from './middlewares/json.js';
import { DbConnection } from './infra/dbConnection.js';

const PORT = 3838;

const dbConnection = new DbConnection();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middlewares
  await getBody(req, res);

  // rotas
  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(dbConnection.get('users')));
  }

  if (method === 'POST' && url === '/users') {
    dbConnection.insert('veiculos', req.body);
    return res.writeHead(201).end();
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`listening at http://localhost:/${PORT}`);
});
