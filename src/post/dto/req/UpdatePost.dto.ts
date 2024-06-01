import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    example: 'This is title',
    description: '게시글 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is body',
    description: '게시글 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100000)
  body: string;
}
