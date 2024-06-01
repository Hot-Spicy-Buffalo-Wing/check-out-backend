import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostListQueryDto {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pageSize: number;
}
