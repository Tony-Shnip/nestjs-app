import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.string('id', 255);
    table.string('name', 50).notNullable();
    table.string('surname', 50).notNullable();
    table.integer('age').notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
