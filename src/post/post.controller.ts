import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/CreatePost.dto';

import { UpdatePostDto } from './dto/req/UpdatePost.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostDto, PostListDto } from './dto/res/postRes.dto';
import { GetPostListQueryDto } from './dto/req/GetPostListQuery.dto';
import { deletePostResDto } from './dto/res/deletePostRes.dto';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'Get post list',
    description: 'Get post list',
  })
  @ApiOkResponse({
    type: PostListDto,
    description: 'Return post list',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  getPostList(
    @Query()
    { page = 1, pageSize = 10 }: GetPostListQueryDto,
  ): Promise<PostListDto> {
    return this.postService.getPostList(page, pageSize);
  }

  @ApiOperation({
    summary: 'Get post with id',
    description: 'Get post with id',
  })
  @ApiOkResponse({
    type: PostDto,
    description: 'Return post',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @ApiOperation({
    summary: 'Create post',
    description: 'Create post',
  })
  @ApiOkResponse({
    type: PostDto,
    description: 'Return post',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @GetUser() userUuid: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(createPostDto, userUuid);
  }

  @ApiOperation({
    summary: 'Update post',
    description: 'Update post',
  })
  @ApiOkResponse({
    type: PostDto,
    description: 'Return modified post',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(
    @GetUser() userUuid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(updatePostDto, id, userUuid);
  }

  @ApiOperation({
    summary: 'Delete post',
    description: 'Update post',
  })
  @ApiOkResponse({
    type: deletePostResDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(
    @GetUser() userUuid: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.deletePost(id, userUuid);
  }
}
