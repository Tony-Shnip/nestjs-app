import { BaseModel } from '../base.model';
import visibilityPlugin from 'objection-visibility';

export class AnimalModel extends visibilityPlugin(BaseModel) {
  static tableName = 'animals';

  static hidden: string[] = ['id', 'ownerId'];
  static visible: string[] = ['name', 'type', 'age'];

  name: string;
  type: string;
  age: number;
  ownerId: string;
}
