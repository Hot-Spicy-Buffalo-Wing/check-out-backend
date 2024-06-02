import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { PostRepository } from './post.repository';
import { PostMapper } from './post.mapper';
import { UpdatePostDto } from './dto/req/UpdatePost.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMapper: PostMapper,
  ) {}

  async getPost(id: number) {
    const rawPost = await this.postRepository.getPost(id);
    return this.postMapper.processPost(rawPost);
  }

  async getPostList(page: number, pageSize: number) {
    const rawPostList = await this.postRepository.getPostList(page, pageSize);

    const processPostList = rawPostList.map((rawPost) =>
      this.postMapper.processPost(rawPost),
    );

    return { total: pageSize, list: processPostList };
  }

  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    const rawPost = await this.postRepository.createPost(
      createPostDto,
      userUuid,
    );

    return this.postMapper.processPost(rawPost);
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
