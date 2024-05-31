import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  private readonly logger = new Logger(AuthRepository.name);
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, registerId: string, password: string) {
    this.logger.log('register');
    this.prismaService.user
      .create({
        data: {
          name,
          loginId: registerId,
          password: password,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('register error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createNotice error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    return { message: `user '${name}' is created` };
  }

  async login(loginId: string, password: string) {
    const user = await this.prismaService.user
      .findUniqueOrThrow({
        where: { loginId: loginId },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`No user found for loginId: ${loginId}`);
            throw new NotFoundException(
              `No user found for loginId: ${loginId}`,
            );
          }
          this.logger.error('login error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('login error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userUuid: user.uuid }),
    };
  }
}
