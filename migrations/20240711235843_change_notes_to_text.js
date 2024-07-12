/* Converts notes fields from `varchar(255)` to `text`.  I accidentally made the
 * notes column as a `string`, likely converting from the TypeScript definitions
 * and that is converted into a `varchar(255)` which is not suitable for
 * long-form notes. */

async function up(knex) {
  await knex.schema.alterTable('opportunity', tableBuilder => {
    tableBuilder.text('notes').notNullable().defaultTo('').alter();
  });
  await knex.schema.alterTable('update', tableBuilder => {
    tableBuilder.text('notes').notNullable().defaultTo('').alter();
  });
}

async function down(knex) {
  await knex.schema.alterTable('opportunity', tableBuilder => {
    tableBuilder.string('notes').notNullable().defaultTo('').alter();
  });
  await knex.schema.alterTable('update', tableBuilder => {
    tableBuilder.string('notes').notNullable().defaultTo('').alter();
  });
}

// Note: Migrations must be in raw JS because they will be pulled into the image
// without compiling.
// TODO: run migrations through tsc
module.exports = {
  up,
  down,
};