import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('animals', table => {
    table.string('id', 255);
    table.string('name', 50).notNullable();
    table.string('type', 100).notNullable();
    table.integer('age').notNullable();
    table.string('ownerId', 255);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('animals');
}
