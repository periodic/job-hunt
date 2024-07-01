import knex from 'knex';

const dbConfig =

process.env.NODE_ENV === 'development'
  ? {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
  }
  : {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE ?? process.env.DB_USER,
    }
  };

export const client = knex(dbConfig);