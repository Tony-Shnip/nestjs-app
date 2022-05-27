import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cars').del();

  // Inserts seed entries
  await knex('cars').insert([
    {
      id: 'pofn67n3-8abb-40aa-95a1-cld58gbdf5fa',
      brand: 'Audi',
      year: 2007,
      condition: 'broken',
      price: 7000,
    },
    {
      id: 'mcn65dd4-8abb-40aa-95a1-51e9dynvf5fa',
      brand: 'BMW',
      year: 2022,
      condition: 'new',
      price: 47000,
    },
    {
      id: 'certdh34-8abb-40aa-95a1-5p98d76d65fa',
      brand: 'Ford',
      year: 1998,
      condition: 'after repair',
      price: 3500,
    },
  ]);
}
