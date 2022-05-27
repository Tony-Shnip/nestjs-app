import { Field } from '@nestjs/graphql';
import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export class BaseModel extends Model {
  @Field()
  id: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  $beforeInsert(): void | Promise<any> {
    this.id = uuidv4();
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
