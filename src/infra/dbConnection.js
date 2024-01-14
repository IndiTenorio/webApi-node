import fs from 'node:fs/promises';

export class DbConnection {
  cachedDb = {};
  #dbPath = new URL('db.json', import.meta.url);

  constructor() {
    this.#initDb();
  }

  #initDb() {
    fs.readFile(this.#dbPath, 'utf-8')
      .then((data) => {
        this.cachedDb = JSON.parse(data);
      })
      .catch(() => {
        this.#persistDb();
      });
  }

  #persistDb(table, data = '{}') {
    if (table) {
      if (this.cachedDb[table]) {
        this.cachedDb[table].push(data);
      } else {
        this.cachedDb[table] = [data];
      }
    }

    fs.writeFile(this.#dbPath, JSON.stringify(this.cachedDb), 'utf-8');
  }

  get(table) {
    return this.cachedDb[table] ?? [];
  }

  insert(table, data) {
    if (data === null || data === undefined) {
      console.log('por favor informe um dado válido');
      return;
    }
    this.#persistDb(table, data);
  }
}
