import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum GenderEnum {
  female = '여자',
  male = '남자',
  none = '논바이너리',
}

enum AgeRangeEnum {
  early_teens = '10대 초반',
  late_teens = '10대 후반',
  early_twenties = '20대 초반',
  late_twenties = '20대 후반',
  early_thirties = '30대 초반',
  late_thirties = '30대 후반',
  early_forties = '40대 초반',
  late_forties = '40대 후반',
  early_fifties = '50대 초반',
  late_fifties = '50대 후반',
}
export class AiReqBodyDto {
  @ApiProperty({
    enum: GenderEnum,
  })
  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @ApiProperty({ enum: AgeRangeEnum })
  @IsNotEmpty()
  @ApiProperty()
  ageRange: string;

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
