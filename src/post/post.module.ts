import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { ConfigModule } from '@nestjs/config';
import { PostMapper } from './post.mapper';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, ConfigModule, FileModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostMapper],
})
export class PostModule {}
