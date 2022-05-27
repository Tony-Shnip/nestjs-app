import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCarDto {
  @Field()
  brand: string;

  @Field()
  year: number;

  @Field()
  condition: string;

  @Field()
  price: number;
}
