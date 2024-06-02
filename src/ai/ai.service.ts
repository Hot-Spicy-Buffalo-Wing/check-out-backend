import { HttpService } from '@nestjs/axios';
import {
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
          .post(
            this.configService.get<string>('AI_URL')!,
            {
              area: {
                province,
                city,
                district,
              },
              TPO,
            },
            { params: { gender, ageRange } },
          )
          .pipe(
            catchError((err) => {
              this.logger.error(err);
              this.logger.error(err.response?.data);
              throw new InternalServerErrorException();
            }),
          ),
      );

      if (response.data) {
        return this.fileService.uploadFile(response.data.url);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
