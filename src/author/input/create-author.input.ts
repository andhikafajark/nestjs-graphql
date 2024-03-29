import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @Field(() => [ID], { defaultValue: [] })
  posts: string[];
}
