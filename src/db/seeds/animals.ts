import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('animals').del();

  // Inserts seed entries
  await knex('animals').insert([
    {
      id: 'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
      name: 'Cody',
      type: 'Wolf',
      age: 7,
      ownerId: '8c4199ca-3f78-441a-874b-c5438902008c',
    },
    {
      id: 'c26ff08b-5697-4379-80f4-46c868bae82d',
      name: 'Tom',
      type: 'Cat',
      age: 5,
      ownerId: 'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
    },
    {
      id: '8c4199ca-3f78-441a-874b-c5438902008c',
      name: 'Jerry',
      type: 'Mouse',
      age: 3,
      ownerId: 'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
    },
  ]);
}
