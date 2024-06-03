import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { HttpModule } from '@nestjs/axios';
import { FileModule } from 'src/file/file.module';
import { AiService } from './ai.service';
import { AiRepository } from './ai.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, HttpModule, FileModule, UserModule],
  controllers: [AiController],
  providers: [AiService, AiRepository],
})
export class AiModule {}
