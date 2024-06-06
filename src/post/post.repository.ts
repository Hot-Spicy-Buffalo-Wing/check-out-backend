import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { UpdatePostDto } from './dto/req/UpdatePost.dto';

@Injectable()
export class PostRepository {
  private readonly logger = new Logger(PostRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(id: number) {
    this.logger.log('getPost');
    return this.prismaService.post
      .findUniqueOrThrow({
        where: {
          id,
          deletedAt: null,
        },
        include: {
          author: {
            select: {
              name: true,
              uuid: true,
            },
          },
          contents: {
            select: {
              title: true,
              body: true,
            },
          },
          files: { select: { imageUuid: true } },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Post with id ${id} not found`);
            throw new NotFoundException(`Post with id ${id} not found`);
          }
          this.logger.error('getPost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getPost error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async getPostList(page: number, pageSize: number) {
    this.logger.log('getPostList');

    const skip = (page - 1) * pageSize;

    return this.prismaService.post
      .findMany({
        skip: skip,
        take: pageSize,
        include: {
          author: {
            select: {
              name: true,
              uuid: true,
            },
          },
          contents: {
            select: {
              title: true,
              body: true,
            },
          },
          files: { select: { imageUuid: true } },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('getPostList error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getPostList error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async createPost(
    { title, body, imageUuid }: CreatePostDto,
    userUuid: string,
  ) {
    this.logger.log('createPost');
    return this.prismaService.post
      .create({
        data: {
          author: {
            connect: {
              uuid: userUuid,
            },
          },
          contents: {
            create: {
              title,
              body,
            },
          },
          createdAt: new Date(),
          files: {
            create: [
              ...imageUuid.map((uuid, idx) => ({
                order: idx,
                name: title,
                imageUuid: uuid,
              })),
            ],
          },
        },
        include: {
          author: { select: { name: true, uuid: true } },
          contents: { select: { title: true, body: true } },
          files: { select: { imageUuid: true } },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`User uuid not found`);
            throw new NotFoundException(`User uuid not found`);
          }
          this.logger.error('createPost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createPost error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async updatePost(
    { title, body }: UpdatePostDto,
    id: number,
    userUuid: string,
  ) {
    this.logger.log('updatePost');
    await this.prismaService.post
      .update({
        where: { id, authorId: userUuid, deletedAt: null },
        data: {
          updatedAt: new Date(),
          contents: {
            update: {
              where: {
                postId: id,
              },
              data: {
                title,
                body,
              },
            },
          },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('updatePost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('updatePost Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async deletePost(id: number, userUuid: string) {
    this.logger.log('deletePost');
    await this.prismaService.post
      .update({
        where: {
          id,
          authorId: userUuid,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Post with id ${id} not found`);
            throw new NotFoundException(`Post with id ${id} not found`);
          }
          this.logger.error('deletePost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('deletePost Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    return { message: `post with id ${id} has been successfully deleted` };
  }
}
