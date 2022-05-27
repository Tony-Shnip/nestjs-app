import visibilityPlugin from 'objection-visibility';
import { Model } from 'objection';

import { BaseModel } from '../base.model';
import { AnimalModel } from '../animals/animals.model';

export class UserModel extends visibilityPlugin(BaseModel) {
  static tableName = 'users';

  static hidden: string[] = ['surname'];
  static visible: string[] = ['id', 'name', 'age'];

  name: string;
  surname: string;
  age: number;

  static relationMappings = {
    pets: {
      relation: Model.HasManyRelation,
      modelClass: AnimalModel,
      join: {
        from: 'users.id',
        to: 'animals.ownerId',
      },
    },
  };
}
