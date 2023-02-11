import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteAuthorInput {
  @Field(() => ID)
  id: string;
}
