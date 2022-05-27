import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCarDto {
  @Field({ nullable: true })
  readonly brand: string;

  @Field({ nullable: true })
  readonly year: number;

  @Field({ nullable: true })
  readonly condition: string;

  @Field({ nullable: true })
  readonly price: number;
}
