async function up(knex) {
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


async function down(knex) {
  await knex.schema.dropTableIfExists('opportunity');
  await knex.schema.dropTableIfExists('update');
}

// Note: Migrations must be in raw JS because they will be pulled into the image
// without compiling.
// TODO: run migrations through tsc
module.exports = {
  up,
  down,
};
