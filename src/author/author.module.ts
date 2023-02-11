import { Module } from '@nestjs/common';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { PostModule } from '../post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    PostModule,
  ],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
