import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';
import { ConfigService } from '@nestjs/config';
import { UpdatePostDto } from './dto/req/UpdatePost.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/user/decorator/get-user.decorator';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @GetUser() userUuid: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(createPostDto, userUuid);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(
    @GetUser() userUuid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(updatePostDto, id, userUuid);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(
    @GetUser() userUuid: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.deletePost(id, userUuid);
  }
}
