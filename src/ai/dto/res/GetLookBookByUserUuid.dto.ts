import { ApiProperty } from '@nestjs/swagger';
import { GetLookBookByIdDto } from './GetLookBookById.dto';

export class GetLookBookByUserUuidDto {
  @ApiProperty({ example: 2 })
  total: number;

  @ApiProperty({
    type: GetLookBookByIdDto,
    isArray: true,
    example: [
      {
        id: 1,
        createdAt: '2024-06-02T13:52:04.533Z',
        authorId: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b',
        prompt:
          '자외선이 매우 강하고, 더운 날씨에서 캠퍼스룩 스타일로  입기 좋은 옷차림의 10대 초반 여자 한국인 모델이, 깔끔한 배경에서 상하의가 모두 나온 사진을 1024x1792 크기로 생성해주세요.',
        imageUrl:
          'https://minio.check-out.paperst.ar/lookbook/78063179-855c-4f4a-880a-de6b6d694c10?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=17xdOavXSt8iSLFYyFQw%2F20240602%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240602T133222Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=c9ccfe49ac995387dcd6ff75b24dc42df76c7bcef455a0cb5179d30c7ecd35c7',
      },
      {
        id: 2,
        createdAt: '2024-06-02T13:52:04.533Z',
        authorId: '38a8c0e4-a9b5-4e55-a13d-d7bc5339172b',
        prompt:
          '자외선이 매우 강하고, 더운 날씨에서 캠퍼스룩 스타일로  입기 좋은 옷차림의 10대 초반 여자 한국인 모델이, 깔끔한 배경에서 상하의가 모두 나온 사진을 1024x1792 크기로 생성해주세요.',
        imageUrl:
          'https://minio.check-out.paperst.ar/lookbook/78063179-855c-4f4a-880a-de6b6d694c10?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=17xdOavXSt8iSLFYyFQw%2F20240602%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240602T133222Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=c9ccfe49ac995387dcd6ff75b24dc42df76c7bcef455a0cb5179d30c7ecd35c7',
      },
    ],
  })
  list: GetLookBookByIdDto[];
}
