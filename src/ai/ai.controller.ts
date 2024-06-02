import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiReqBodyDto } from './dto/req/AiReqBody.dto';
import { AiService } from './ai.service';
import { AiReqQueryDto } from './dto/req/AiReqQuery.dto';

@Controller('ai')
@ApiTags('AI')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  generateLookBook(
    @Query()
    { gender, ageRange }: AiReqQueryDto,
    @Body() { area, TPO }: AiReqBodyDto,
  ) {
    return this.aiService.generateLookBook(gender, ageRange, area, TPO);
  }
}
