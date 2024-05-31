import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { ConfigService } from '@nestjs/config';
import { UpdatePostDto } from './dto/req/UpdatePost.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}

  userUuidForDev = this.configService.get<string>('TEST_USERUUID') as string;

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto, this.userUuidForDev);
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(updatePostDto, id, this.userUuidForDev);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id, this.userUuidForDev);
  }
}
