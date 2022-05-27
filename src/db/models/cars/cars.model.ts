import visibilityPlugin from 'objection-visibility';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'objection';

@ObjectType()
export class CarsModel extends visibilityPlugin(Model) {
  static tableName = 'cars';

  static hidden: string[] = ['price'];
  static visible: string[] = ['id', 'brand', 'year', 'condition'];

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

  @Field()
  brand: string;

  @Field()
  year: number;

  @Field()
  condition: string;

  @Field()
  price: number;
}
