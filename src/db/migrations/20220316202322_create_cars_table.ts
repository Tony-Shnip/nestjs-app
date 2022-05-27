import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', table => {
    table.string('id', 255);
    table.string('brand', 50).notNullable();
    table.integer('year').notNullable();
    table.string('condition', 20).notNullable();
    table.integer('price').notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
