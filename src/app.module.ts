import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from './author/author.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql/error';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/test?authSource=admin',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
      formatError: (error: GraphQLError) => {
        return {
          statusCode: (error as any)?.extensions?.response?.statusCode || 500,
          code: error?.extensions?.code || 'INTERNAL_SERVER_ERROR',
          message:
            (error as any)?.extensions?.response?.error ||
            'Internal Server Error',
          errors: (error as any)?.extensions?.response?.message || [],
        };
      },
    }),
    AuthorModule,
    PostModule,
  ],
})
export class AppModule {}
