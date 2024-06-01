import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
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

  @ApiProperty({
    example: ['image_url1,', 'image_url2', 'image_url3'],
    description: '이미지 url list',
    required: true,
  })
  @IsString({ each: true })
  @IsNotEmpty()
  imageUrls: string[] = [];
}
