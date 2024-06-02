import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.s3Client = new S3Client({
      endpoint: configService.get<string>('S3_URL'),
      bucketEndpoint: false,
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
      region: configService.get<string>('AWS_S3_REGION'),
    });
  }

  async uploadFile(url: string) {
    this.logger.log('uploadFile called');

    const response = await firstValueFrom(
      this.httpService.get(url, {
        decompress: false,
        responseType: 'arraybuffer',
      }),
    );

    const imageUuid = uuidv4();

    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME'),
      Key: imageUuid,
      Body: response.data,
    });

    await this.s3Client.send(command).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException();
    });

    const s3Url = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME'),
        Key: imageUuid,
      }),
      { expiresIn: 3600 },
    );

    return s3Url;
  }
}
