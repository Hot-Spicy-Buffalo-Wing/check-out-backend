import { Injectable, Logger } from '@nestjs/common';
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
}
