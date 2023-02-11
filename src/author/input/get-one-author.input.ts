import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetOneAuthorInput {
  @Field(() => ID)
  id: string;
}
