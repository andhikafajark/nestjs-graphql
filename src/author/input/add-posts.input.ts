import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AddPostsInput {
  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  postIds: string[];
}
