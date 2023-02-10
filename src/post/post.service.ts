import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreatePostInput } from './input/create-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const { title } = createPostInput;

    const post = this.postRepository.create({
      id: uuid(),
      title,
    });

    return this.postRepository.save(post);
  }

  async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPost(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }
}
