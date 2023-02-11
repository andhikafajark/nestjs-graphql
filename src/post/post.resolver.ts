import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './dto/post-type.dto';
import { CreatePostInput } from './input/create-post.input';
import { GetOnePostInput } from './input/get-one-post.input';
import { UpdatePostInput } from './input/update-post.input';
import { DeletePostInput } from './input/delete-post.input';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostType])
  async posts() {
    return this.postService.getAll();
  }

  @Mutation(() => PostType)
  async createPost(@Args('createPostInput') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Query(() => PostType, { nullable: true })
  async post(@Args('post') input: GetOnePostInput) {
    return this.postService.getOne(input);
  }

  @Mutation(() => PostType)
  async updatePost(@Args('updatePostInput') input: UpdatePostInput) {
    return this.postService.update(input);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('deletePostInput') input: DeletePostInput) {
    const res = await this.postService.delete(input);

    return res.deletedCount > 0;
  }
}
