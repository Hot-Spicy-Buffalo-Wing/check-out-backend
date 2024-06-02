import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { HttpModule } from '@nestjs/axios';
import { FileModule } from 'src/file/file.module';
import { AiService } from './ai.service';

@Module({
  imports: [ConfigModule, HttpModule, FileModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
