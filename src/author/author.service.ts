import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateAuthorInput } from './input/create-author';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async createAuthor(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const { firstName, lastName, postIds } = createAuthorInput;

    const author = this.authorRepository.create({
      id: uuid(),
      firstName,
      lastName,
      posts: postIds,
    });

    return this.authorRepository.save(author);
  }

  async getAuthors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async getAuthor(id: string): Promise<Author> {
    return this.authorRepository.findOne({ where: { id } });
  }

  async addPosts(authorId: string, postIds: string[]): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
    });

    author.posts = [...author.posts, ...postIds];

    return this.authorRepository.save(author);
  }
}
