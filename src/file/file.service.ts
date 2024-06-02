import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly minioService: MinioService,
  ) {}

  async uploadFile(url: string) {
    this.logger.log('uploadFile called');

    const response = await firstValueFrom(
      this.httpService.get(url, {
        decompress: false,
        responseType: 'arraybuffer',
      }),
    );

    const imageUuid = uuidv4();

    await this.minioService.client
      .putObject(
        this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME'),
        imageUuid,
        response.data,
      )
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });

    const s3Url = this.minioService.client.presignedUrl(
      'GET',
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME'),
      imageUuid,
      24 * 60 * 60,
    );

    return s3Url;
  }
}
