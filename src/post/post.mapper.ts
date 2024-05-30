import { ConfigService } from '@nestjs/config';
import { PostFullContent } from './types/PostFullContent';
// import { PostFullContent } from './types/PostFullContent';

export class PostMapper {
  // 나중에 필요할 것으로 예상됨
  constructor(private readonly configService: ConfigService) {}

  processPost({
    id,
    views,
    createdAt,
    updatedAt,
    author,
    contents,
    files,
  }: PostFullContent) {
    return {
      id,
      views,
      createdAt,
      updatedAt,
      author,
      contents,
      imageUrls: files.map(({ url }: any) => `${url}`),
    };
  }
}
