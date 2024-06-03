import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { FileService } from 'src/file/file.service';
import { AiRepository } from './ai.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    private readonly aiRepository: AiRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getLookBookById(id: number) {
    return await this.aiRepository.getLookBookById(id);
  }

  async getLookBookByUserUuid(userUuid: string) {
    return await this.aiRepository.getLookBookByUserUuid(userUuid);
  }

  async createLookBook(
    {
      province,
      city,
      district,
    }: { province: string; city: string; district: string },
    TPO: [string],
    userUuid: string,
  ) {
    const userInfo = await this.userRepository.getUserInfo(userUuid);

    if (!userInfo.gender || !userInfo.ageRange) {
      throw new HttpException(
        'UserInfo does not exist. Update User info first',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(this.configService.get<string>('AI_URL')!, {
            gender: userInfo.gender,
            ageRange: userInfo.ageRange,
            area: {
              province,
              city,
              district,
            },
            TPO,
          })
          .pipe(
            catchError((err) => {
              this.logger.error(err);
              this.logger.error(err.response?.data);
              throw new InternalServerErrorException();
            }),
          ),
      );

      if (response.data) {
        const s3Url = await this.fileService.uploadFile(response.data.url);

        await this.aiRepository.createLookBook(
          response.data.prompt,
          s3Url,
          userUuid,
        );

        return { prompt: response.data.prompt, imageUrl: s3Url };
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Error occur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteLookBook(id: number, userUuid: string) {
    const lookBook = await this.aiRepository.getLookBookById(id);

    if (lookBook.authorId !== userUuid) {
      throw new ForbiddenException();
    }

    return this.aiRepository.deleteLookBook(id, userUuid);
  }
}
