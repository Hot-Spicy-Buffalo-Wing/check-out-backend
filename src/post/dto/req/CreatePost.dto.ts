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
    example: ['image_uuid1,', 'image_uuid2', 'image_uuid3'],
    description: '이미지 uuid list',
    required: true,
  })
  @IsString({ each: true })
  @IsNotEmpty()
  imageUuid: string[] = [];
}
