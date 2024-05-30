import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    return this.postRepository.createPost(createPostDto, userUuid);
  }
}
