import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('abonents').del();

  // Inserts seed entries
  await knex('abonents').insert([
    {
      id: 'm14562d4-8abb-40aa-95e1-51e73845f5cb',
      username: 'Kekes_Memes',
      password: 'memesAndKekes',
      role: 'user',
      email: 'lalal@lal.meme',
    },
    {
      id: 'c26ff08c-5697-2634-80a4-46c375cae82d',
      username: 'pro100_XuJIuGan',
      password: '88005553535password',
      role: 'user',
      email: 'kekeke@lal.meme',
    },
    {
      id: '8f2416oa-3f78-441a-874b-k5439471056c',
      username: '3a4eM_MHe_HuK',
      password: 'strongpassword',
      role: 'admin',
      email: 'lololo@lal.meme',
    },
  ]);
}
