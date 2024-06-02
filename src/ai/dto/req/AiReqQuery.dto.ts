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

export class AiReqQueryDto {
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
}
