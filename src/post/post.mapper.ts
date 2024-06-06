import { PostFullContent } from './types/PostFullContent';

export class PostMapper {
  constructor() {}

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
      contents: contents[0],
      imageUuid: files.map(({ uuid }: any) => `${uuid}`),
    };
  }
}
