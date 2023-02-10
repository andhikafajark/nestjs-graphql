import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MinLength(1)
  @Field()
  title: string;
}
