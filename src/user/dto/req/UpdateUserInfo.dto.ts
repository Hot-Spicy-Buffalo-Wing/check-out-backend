import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

enum GenderEnum {
  female = '여자',
  male = '남자',
  none = '논바이너리',
}

enum AgeRangeEnum {
  early_twenties = '20대 초반',
  late_twenties = '20대 후반',
  early_thirties = '30대 초반',
  late_thirties = '30대 후반',
  early_forties = '40대 초반',
  late_forties = '40대 후반',
  early_fifties = '50대 초반',
  late_fifties = '50대 후반',
}

export class UpdateUserInfoDto {
  @ApiProperty({
    example: '남자',
    description: '성별',
    required: true,
    enum: GenderEnum,
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '20대 초반',
    description: '나이',
    required: true,
    enum: AgeRangeEnum,
  })
  @IsString()
  @IsNotEmpty()
  ageRange: string;
}
