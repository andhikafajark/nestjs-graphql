import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateAuthorInput {
  @Field(() => ID)
  id: string;

  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @Field(() => [ID], { defaultValue: [] })
  posts: string[];
}
