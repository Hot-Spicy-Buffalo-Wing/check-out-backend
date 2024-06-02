import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiReqBodyDto } from './dto/req/AiReqBody.dto';
import { AiService } from './ai.service';

@Controller('ai')
@ApiTags('AI')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  generateLookBook(@Body() { gender, ageRange, area, TPO }: AiReqBodyDto) {
    return this.aiService.generateLookBook(gender, ageRange, area, TPO);
  }
}
