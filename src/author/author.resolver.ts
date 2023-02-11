import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { CreateAuthorInput } from './input/create-author.input';
import { AuthorType } from './dto/author-type.dto';
import { PostService } from '../post/post.service';
import { AddPostsInput } from './input/add-posts.input';
import { GetOneAuthorInput } from './input/get-one-author.input';
import { UpdateAuthorInput } from './input/update-author.input';
import { DeleteAuthorInput } from './input/delete-author.input';

@Resolver(() => AuthorType)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private postService: PostService,
  ) {}

  @Query(() => [AuthorType])
  async authors() {
    return this.authorService.getAll();
  }

  @Mutation(() => AuthorType)
  async createAuthor(@Args('createAuthorInput') input: CreateAuthorInput) {
    return this.authorService.create(input);
  }

  @Query(() => AuthorType, { nullable: true })
  async author(@Args('author') input: GetOneAuthorInput) {
    return this.authorService.getOne(input);
  }

  @Mutation(() => AuthorType)
  async updateAuthor(@Args('updateAuthorInput') input: UpdateAuthorInput) {
    return this.authorService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Args('deleteAuthorInput') input: DeleteAuthorInput) {
    const res = await this.authorService.delete(input);

    return res.deletedCount > 0;
  }

  @Mutation(() => AuthorType)
  async addPosts(@Args('addPostsInput') addPostsInput: AddPostsInput) {
    const { authorId, posts } = addPostsInput;

    return this.authorService.addPosts(authorId, posts);
  }

  @ResolveField('posts')
  async posts(@Parent() author: AuthorType) {
    return this.postService.getAllPostWithIds(author.posts);
  }
}
