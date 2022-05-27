import { BaseModel } from '../base.model';
import visibilityPlugin from 'objection-visibility';

export class AbonentModel extends visibilityPlugin(BaseModel) {
  static tableName = 'abonents';

  static hidden: string[] = ['password'];
  static visible: string[] = ['id', 'username', 'email', 'role'];

  username: string;
  password: string;
  role: string;
  email: string;
}
