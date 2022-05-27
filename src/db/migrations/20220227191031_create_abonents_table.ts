import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('abonents', table => {
    table.string('id', 255);
    table.string('username', 50).notNullable();
    table.string('password', 120).notNullable();
    table.string('role', 20).notNullable();
    table.string('email', 50).unique();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('abonents');
}
