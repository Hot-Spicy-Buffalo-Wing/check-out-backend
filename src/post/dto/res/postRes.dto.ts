import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 6 })
  views: number;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({
    example: { name: 'testuser', uuid: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b' },
  })
  author: { name: string; uuid: string };

  @ApiProperty({ example: { title: 'This is title', body: 'This is body' } })
  contents: { title: string; body: string };

  @ApiProperty({
    example: ['image_url1,', 'image_url2', 'image_url3'],
  })
  imageUrls: string[];
}

export class PostListDto {
  @ApiProperty({ example: 3 })
  total: number;

  @ApiProperty({
    type: PostDto,
    isArray: true,
    example: [
      {
        id: 1,
        views: 6,
        createdAt: '2024-06-01T07:32:25.777Z',
        updatedAt: '2024-06-01T07:32:25.777Z',
        author: {
          name: 'testuser',
          uuid: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b',
        },
        contents: {
          title: 'This is title',
          body: 'This is body',
        },
        imageUrls: ['image_url1,', 'image_url2', 'image_url3'],
      },
      {
        id: 1,
        views: 6,
        createdAt: '2024-06-01T07:32:25.777Z',
        updatedAt: '2024-06-01T07:32:25.777Z',
        author: {
          name: 'testuser',
          uuid: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b',
        },
        contents: {
          title: 'This is title',
          body: 'This is body',
        },
        imageUrls: ['image_url1,', 'image_url2', 'image_url3'],
      },
      {
        id: 1,
        views: 6,
        createdAt: '2024-06-01T07:32:25.777Z',
        updatedAt: '2024-06-01T07:32:25.777Z',
        author: {
          name: 'testuser',
          uuid: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b',
        },
        contents: {
          title: 'This is title',
          body: 'This is body',
        },
        imageUrls: ['image_url1,', 'image_url2', 'image_url3'],
      },
    ],
  })
  list: PostDto[];
}
