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

let clientInstance: knex.Knex | null = null

export async function client() {
  if (!clientInstance) {
    clientInstance = process.env.NODE_ENV === 'development'
        ? devClient()
        : prodClient();

    console.log('Running migrations')
    await clientInstance.migrate.latest().then(
      ([batchNo, log]) => {
        if (log.length === 0) {
          console.log('Database up to date.');
        } else {
          console.log(`Migration batch ${batchNo} run: ${log.length} migrations\n${log.join('\n')}`);
        }
      },
      err =>
        console.error("Migrations failed", err)
    );
  }

  return clientInstance;
}

// This function exists because knex won't let you put a query builder in a
// promise.  Trying to put it in a promise means JS will see it's then-able and
// try to .then it.  This triggers it to make a query and the query builder is
// lost.  This should be fine for a non-prod server like this.
export async function makeClient<T extends {}>(
  table:string
  // Return type is inferred because it uses `DeferredKeySelection` which is not
  // exposed.
) {
  return {
    client: (await client())<T>(table),
  }
}