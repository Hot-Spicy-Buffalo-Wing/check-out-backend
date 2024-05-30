import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { ConfigService } from '@nestjs/config';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const userUuidForDev = this.configService.get<string>(
      'TEST_USERUUID',
    ) as string;
    return this.postService.createPost(createPostDto, userUuidForDev);
  }
}
