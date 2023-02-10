import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorType } from './author.type';
import { AuthorService } from './author.service';
import { CreateAuthorInput } from './author.input';

@Resolver(() => AuthorType)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Query(() => [AuthorType])
  authors() {
    return this.authorService.getAuthors();
  }

  @Query(() => AuthorType)
  author(@Args('id') id: string) {
    return this.authorService.getAuthor(id);
  }

  @Mutation(() => AuthorType)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorService.createAuthor(createAuthorInput);
  }
}
