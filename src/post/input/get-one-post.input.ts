import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetOnePostInput {
  @Field(() => ID)
  id: string;
}
