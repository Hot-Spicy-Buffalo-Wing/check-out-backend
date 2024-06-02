import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get<string>('S3_URL')!,
        accessKey: configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretKey: configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
        region: configService.get<string>('AWS_S3_REGION')!,
      }),
    }),
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
