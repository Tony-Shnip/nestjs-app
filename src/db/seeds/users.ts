import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
      name: 'Jamie',
      surname: 'Lannister',
      age: 27,
    },
    {
      id: 'c26ff08b-5697-4379-80f4-46c868bae82d',
      name: 'Sansa',
      surname: 'Stark',
      age: 17,
    },
    {
      id: '8c4199ca-3f78-441a-874b-c5438902008c',
      name: 'John',
      surname: 'Snow',
      age: 22,
    },
  ]);
}
