import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { FileService } from 'src/file/file.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
  ) {}

  async generateLookBook(
    gender: string,
    ageRange: string,
    {
      province,
      city,
      district,
    }: { province: string; city: string; district: string },
    TPO: [string],
  ) {
    this.logger.log('generateLookBook called');

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(this.configService.get<string>('AI_URL')!, {
            gender,
            ageRange,
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

        return { prompt: response.data.prompt, url: s3Url };
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Error occur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
