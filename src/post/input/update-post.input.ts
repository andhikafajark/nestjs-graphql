import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  id: string;

  @MinLength(1)
  @Field()
  title: string;
}
