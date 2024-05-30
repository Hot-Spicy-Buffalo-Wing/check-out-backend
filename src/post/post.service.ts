import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { PostRepository } from './post.repository';
import { PostMapper } from './post.mapper';

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

  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    return this.postRepository.createPost(createPostDto, userUuid);
  }
}
