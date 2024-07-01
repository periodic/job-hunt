import { client } from "./client"

export const createSchema = async () => {
  await client.schema.dropTableIfExists('opportunity');
  await client.schema.createTable('opportunity', function (table) {
    table.increments('id', { primaryKey: true });
    table.string('company');
    table.string('role');
    table.string('notes');
    table.dateTime('created').notNullable();
  });

  await client.schema.dropTableIfExists('update');
  await client.schema.createTable('update', function (table) {
    table.increments('id', { primaryKey: true });
    table.string('state').notNullable();
    table.string('notes').notNullable();
    table.dateTime('created').notNullable();
    table.integer('opportunity_id').notNullable();
    table.foreign('opportunity_id').references('opportunity.id');
  });
}