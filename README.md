# Job Tracker

A simple job tracker suitable for a single user.  Tracks opportunities as they move through your job-hunt pipeline.

## Development

First, make sure to set up your environment.  This project uses NVM to manage versions, but you are welcome to use any similar tool.

```sh
nvm use
npm install
```

You may then start the development server.  It is configured to use sqlite in `database/client.ts`.  It will be available at `https://localhost:3000` (or higher if that port is already in use).

```sh
npm run dev
```

### Deployment

Deployment is intended to be done via a docker image.  A script to build and push the image is included at `scripts/build-and-push.sh`.  It has a hard-coded image name so you may need to change that for your environment.

```sh
npm run push
```

## Migrations

Migrations are handled by [Knex](https://knexjs.org/guide/migrations.html).  They are automatically run when the application is started to verify that the database is in a good state.  Note that new migrations should be in JavaScript format (not TypeScript) because they will be loaded directly and are not (yet) passed through a compiler.

New migrations can be generated with a package script.

```sh
npm run migrate:create
```

