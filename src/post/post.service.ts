import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { PostRepository } from './post.repository';
import { PostMapper } from './post.mapper';
import { UpdatePostDto } from './dto/req/UpdatePost.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMapper: PostMapper,
    private readonly fileService: FileService,
  ) {}

  async getPost(id: number) {
    const rawPost = await this.postRepository.getPost(id);
    const { imageUuids, ...post } = this.postMapper.processPost(rawPost);
    return {
      ...post,
      imageUrls: await Promise.all(
        imageUuids.map(async (imageUuid) =>
          this.fileService.getSignedUrl(imageUuid),
        ),
      ),
    };
  }

  async getPostList(page: number, pageSize: number) {
    const rawPostList = await this.postRepository.getPostList(page, pageSize);

    const processPostList = await Promise.all(
      rawPostList
        .map((rawPost) => this.postMapper.processPost(rawPost))
        .map(async ({ imageUuids, ...post }) => ({
          ...post,
          imageUrls: await Promise.all(
            imageUuids.map(async (imageUuid) =>
              this.fileService.getSignedUrl(imageUuid),
            ),
          ),
        })),
    );

    return { total: pageSize, list: processPostList };
  }

  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    const rawPost = await this.postRepository.createPost(
      createPostDto,
      userUuid,
      createPostDto.imageUrls.map((url) =>
        new URL(url).pathname.split('/').slice(2).join('/'),
      ),
    );

    return this.getPost(rawPost.id);
  }

  async updatePost(updatePostDto: UpdatePostDto, id: number, userUuid: string) {
    const post = await this.postRepository.getPost(id);

    if (post.author.uuid !== userUuid) {
      throw new ForbiddenException();
    }

    await this.postRepository.updatePost(updatePostDto, id, userUuid);

    return this.getPost(id);
  }

  async deletePost(id: number, userUuid: string) {
    const post = await this.postRepository.getPost(id);

    if (post.author.uuid !== userUuid) {
      throw new ForbiddenException();
    }

    return this.postRepository.deletePost(id, userUuid);
  }
}
