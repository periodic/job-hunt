import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('opportunity', function (table) {
    table.increments('id', { primaryKey: true });
    table.string('company');
    table.string('role');
    table.string('notes');
    table.dateTime('created').notNullable();
  });

  await knex.schema.createTable('update', function (table) {
    table.increments('id', { primaryKey: true });
    table.string('state').notNullable();
    table.string('notes').notNullable();
    table.dateTime('created').notNullable();
    table.integer('opportunity_id').notNullable();
    table.foreign('opportunity_id').references('opportunity.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('opportunity');
  await knex.schema.dropTableIfExists('update');
}

