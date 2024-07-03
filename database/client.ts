import knex from 'knex';

function devClient() {
  console.log(`Using sqlite database`);
  return knex({
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
  });
}

function prodClient() {
  console.log(`Using database connection ${process.env.DB_USER}@${process.env.DB_HOST}`);
  return knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE ?? process.env.DB_USER,
    }
  });
}

export const client =
  process.env.NODE_ENV === 'development'
    ? devClient()
    : prodClient();