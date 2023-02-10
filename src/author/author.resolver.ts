import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorType } from './author.type';
import { AuthorService } from './author.service';
import { AddPostsInput } from './input/add-posts.input';
import { CreateAuthorInput } from './input/create-author';
import { PostService } from '../post/post.service';
import { PostType } from '../post/post.type';
import { Post } from '../post/post.entity';
import { Author } from './author.entity';

@Resolver(() => AuthorType)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private postService: PostService,
  ) {}

  @Query(() => [AuthorType])
  async authors() {
    return this.authorService.getAuthors();
  }

  @Query(() => AuthorType)
  async author(@Args('id') id: string) {
    return this.authorService.getAuthor(id);
  }

  @Mutation(() => AuthorType)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorService.createAuthor(createAuthorInput);
  }

  @Mutation(() => AuthorType)
  async addPosts(@Args('addPostsInput') addPostsInput: AddPostsInput) {
    const { authorId, postIds } = addPostsInput;

    return this.authorService.addPosts(authorId, postIds);
  }

  @ResolveField('posts')
  async posts(@Parent() author: Author) {
    return this.postService.getAllPostWithIds(author.posts);
  }
}
