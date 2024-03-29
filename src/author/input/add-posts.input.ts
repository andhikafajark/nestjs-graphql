import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddPostsInput {
  @Field(() => ID)
  authorId: string;

  @Field(() => [ID])
  posts: string[];
}
