import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './input/create-author.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';
import { GetOneAuthorInput } from './input/get-one-author.input';
import { UpdateAuthorInput } from './input/update-author.input';
import { DeleteAuthorInput } from './input/delete-author.input';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(input: CreateAuthorInput): Promise<Author> {
    return new this.authorModel(input).save();
  }

  async getAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async getOne(input: GetOneAuthorInput): Promise<Author | null> {
    return this.authorModel.findById(input.id);
  }

  async update(input: UpdateAuthorInput): Promise<Author> {
    const author = await this.authorModel.findById(input.id);

    author.firstName = input.firstName;
    author.lastName = input.lastName;
    author.posts = input.posts;

    return author.save();
  }

  async delete(input: DeleteAuthorInput): Promise<any> {
    return this.authorModel.deleteOne({ _id: input.id });
  }

  async addPosts(authorId: string, postIds: string[]): Promise<Author> {
    const author = await this.authorModel.findById(authorId);

    author.posts = [...author.posts, ...postIds];

    return author.save();
  }
}
