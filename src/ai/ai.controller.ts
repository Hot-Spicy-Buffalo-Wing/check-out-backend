import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AiReqBodyDto } from './dto/req/AiReqBody.dto';
import { AiService } from './ai.service';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetLookBookByIdDto } from './dto/res/GetLookBookById.dto';
import { GetLookBookByUserUuidDto } from './dto/res/GetLookBookByUserUuid.dto';
import { CreateLookBookDto } from './dto/res/CreateLookBook.dto';
import { DeleteLookBookResDto } from './dto/res/DeleteLookBook.dto';

@Controller('ai')
@ApiTags('AI')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiOperation({
    summary: 'Get lookbook by id',
    description: 'Get lookbook by id',
  })
  @ApiOkResponse({
    type: GetLookBookByIdDto,
    description: 'Return lookbook',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getLookBookById(@Param('id', ParseIntPipe) id: number) {
    return this.aiService.getLookBookById(id);
  }

  @ApiOperation({
    summary: 'Get lookbook List by userUuid',
    description: 'Get lookbook List by userUuid',
  })
  @ApiOkResponse({
    type: GetLookBookByUserUuidDto,
    description: 'Return lookbook list',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  getLookBookByUserUuid(@GetUser() userUuid: string) {
    return this.aiService.getLookBookByUserUuid(userUuid);
  }

  @ApiOperation({
    summary: 'Create lookbook',
    description: 'Create lookbook',
  })
  @ApiOkResponse({
    type: CreateLookBookDto,
    description: 'Return lookbook list',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  generateLookBook(
    @GetUser() userUuid: string,
    @Body() { area, TPO }: AiReqBodyDto,
  ) {
    return this.aiService.createLookBook(area, TPO, userUuid);
  }

  @ApiOperation({
    summary: 'Delete lookbook',
    description: 'Delete lookbook',
  })
  @ApiOkResponse({
    type: DeleteLookBookResDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteLookBook(
    @GetUser() userUuid: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.aiService.deleteLookBook(id, userUuid);
  }
}
