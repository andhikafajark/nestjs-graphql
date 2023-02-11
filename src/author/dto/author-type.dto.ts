import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostType } from '../../post/dto/post-type.dto';

@ObjectType()
export class AuthorType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [PostType])
  posts: string[];
}
