import { Global, Module } from '@nestjs/common';
import { knex } from 'knex';
import { Model } from 'objection';
import * as knexConfig from './knexfile';
import { AbonentModel } from './models/abonents/abonents.model';
import { AnimalModel } from './models/animals/animals.model';
import { CarsModel } from './models/cars/cars.model';
import { UserModel } from './models/users/users.model';

const env: string = process.env.NODE_ENV;

const models = [UserModel, AnimalModel, AbonentModel, CarsModel];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knexConfigurated = await knex(knexConfig);
      Model.knex(knexConfigurated);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
