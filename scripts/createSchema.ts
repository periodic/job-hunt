import { createSchema } from "../database/schema";

console.log('Creating Schema');

createSchema()
  .then(
    () => {
      console.log('Created');
      process.exit(0);
    },
    (err) => {
      console.error('Unable to create schema: ', err);
      process.exit(1);
    }
  );