import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUuid(userUuid: string) {
    this.logger.log('getUserByUuid');
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        uuid: userUuid,
      },
    });
  }

  async updateUserInfo(gender: string, ageRange: string, userUuid: string) {
    this.logger.log('updateUserInfo called');
    return this.prismaService.user
      .update({
        where: { uuid: userUuid },
        data: {
          gender,
          ageRange,
        },
        select: {
          gender: true,
          ageRange: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('updateUserInfo error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('updateUserInfo Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async getUserInfo(userUuid: string) {
    this.logger.log('getUserInfo');
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        uuid: userUuid,
      },
      select: {
        gender: true,
        ageRange: true,
      },
    });
  }
}
