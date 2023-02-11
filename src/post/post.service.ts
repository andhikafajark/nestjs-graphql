import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { CreatePostInput } from './input/create-post.input';
import { GetOnePostInput } from './input/get-one-post.input';
import { UpdatePostInput } from './input/update-post.input';
import { DeletePostInput } from './input/delete-post.input';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(input: CreatePostInput): Promise<Post> {
    return new this.postModel(input).save();
  }

  async getAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async getOne(input: GetOnePostInput): Promise<Post | null> {
    return this.postModel.findById(input.id);
  }

  async update(input: UpdatePostInput): Promise<Post> {
    const post = await this.postModel.findById(input.id);
    post.title = input.title;

    return post.save();
  }

  async delete(input: DeletePostInput): Promise<any> {
    return this.postModel.deleteOne({ _id: input.id });
  }

  async getAllPostWithIds(postIds: string[]): Promise<Post[]> {
    return this.postModel.find().where('_id').in(postIds);
  }
}
