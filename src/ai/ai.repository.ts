import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AiRepository {
  private readonly logger = new Logger(AiRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getLookBookById(id: number) {
    this.logger.log('getLookBookById');
    return this.prismaService.lookBook
      .findUniqueOrThrow({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          id: true,
          createdAt: true,
          authorId: true,
          prompt: true,
          imageUrl: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`LookBook with id ${id} not found`);
            throw new NotFoundException(`LookBook with id ${id} not found`);
          }
          this.logger.error('getLookBookById error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getLookBookById error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async getLookBookByUserUuid(userUuid: string) {
    this.logger.log('getLookBookByUserUuid');
    const result = await this.prismaService.lookBook
      .findMany({
        where: {
          authorId: userUuid,
          deletedAt: null,
        },
        select: {
          id: true,
          createdAt: true,
          authorId: true,
          prompt: true,
          imageUrl: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('getLookBookByUserUuid error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getLookBookByUserUuid error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    return { total: result.length, list: result };
  }

  async createLookBook(prompt: string, imageUrl: string, userUuid: string) {
    this.logger.log('createLookBook');
    return this.prismaService.lookBook
      .create({
        data: {
          author: {
            connect: {
              uuid: userUuid,
            },
          },
          createdAt: new Date(),
          prompt,
          imageUrl,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`User uuid not found`);
            throw new NotFoundException(`User uuid not found`);
          }
          this.logger.error('createLookBook error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createLookBook error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async deleteLookBook(id: number, userUuid: string) {
    this.logger.log('deleteLookBook');
    await this.prismaService.lookBook
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
            this.logger.debug(`LookBook with id ${id} not found`);
            throw new NotFoundException(`LookBook with id ${id} not found`);
          }
          this.logger.error('deleteLookBook error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('deleteLookBook Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    return { message: `LookBook with id ${id} has been successfully deleted` };
  }
}
