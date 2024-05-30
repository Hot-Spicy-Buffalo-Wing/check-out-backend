import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';

@Injectable()
export class PostRepository {
  private readonly logger = new Logger(PostRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(id: number) {
    this.logger.log('getPost');
    return this.prismaService.post.findUniqueOrThrow({
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
        files: { select: { url: true } },
      },
    });
  }

  async createPost(
    { title, body, imageUrls }: CreatePostDto,
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
              ...imageUrls.map((imageUrl, idx) => ({
                order: idx,
                name: title,
                url: imageUrl,
              })),
            ],
          },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`User uuid not found`);
            throw new NotFoundException(`User uuid not found`);
          }
          this.logger.error('createNotice error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createNotice error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }
}
