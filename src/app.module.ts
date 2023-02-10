import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author/author.entity';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nestjs-graphql'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:root@localhost:27017/test?authSource=admin',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Author],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    AuthorModule,
  ],
})
export class AppModule {}
