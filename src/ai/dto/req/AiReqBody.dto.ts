import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AiReqBodyDto {
  @ApiProperty({
    example: { province: '서울특별시', city: '강남구', district: '' },
  })
  @IsNotEmpty()
  @ApiProperty()
  area: { province: string; city: string; district: string };

  @ApiProperty({ example: ['캠퍼스룩'] })
  @IsNotEmpty()
  @ApiProperty()
  TPO: [string];
}
