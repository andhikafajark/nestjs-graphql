import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostType } from './post.type';
import { PostService } from './post.service';
import { CreatePostInput } from './input/create-post.input';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostType])
  async posts() {
    return this.postService.getPosts();
  }

  @Query(() => PostType)
  async post(@Args('id') id: string) {
    return this.postService.getPost(id);
  }

  @Mutation(() => PostType)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }
}
