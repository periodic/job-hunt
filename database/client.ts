import knex from 'knex';

export const client = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  },
});