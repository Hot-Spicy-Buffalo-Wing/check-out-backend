import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { UserService } from './user.service';
import { UpdateUserInfoDto } from './dto/req/UpdateUserInfo.dto';
import { GetUserInfoDto } from './dto/res/GetUserInfo.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user info(gender, ageRange)',
    description: 'Get user info(gender, ageRange)',
  })
  @ApiOkResponse({
    type: GetUserInfoDto,
    description: 'Return user info(gender, ageRange)',
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserInfo(@GetUser() userUuid: string) {
    return this.userService.getUserInfo(userUuid);
  }

  @ApiOperation({
    summary: 'Update user info(gender, ageRange)',
    description: 'Update user info(gender, ageRange)',
  })
  @ApiOkResponse({
    type: GetUserInfoDto,
    description: 'Return updated user info(gender, ageRange)',
  })
  @ApiBearerAuth()
  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUserInfo(
    @GetUser() userUuid: string,
    @Body() { gender, ageRange }: UpdateUserInfoDto,
  ) {
    return this.userService.updateUserInfo(gender, ageRange, userUuid);
  }
}
