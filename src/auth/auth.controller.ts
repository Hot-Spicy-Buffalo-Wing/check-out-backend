import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterResDto } from './dto/res/RegisterRes.dto';
import { RegisterDto } from './dto/req/Register.dto';
import { LoginDto } from './dto/req/Login.dto';
import { LoginResDto } from './dto/res/LoginRes.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Create account',
    description: 'Create account',
  })
  @ApiOkResponse({
    type: RegisterResDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('register')
  register(@Body() { name, registerId, password }: RegisterDto) {
    return this.authService.register(name, registerId, password);
  }

  @ApiOperation({
    summary: 'login',
    description: 'Return JWT Token',
  })
  @ApiOkResponse({
    type: LoginResDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('login')
  login(@Body() { loginId, password }: LoginDto) {
    return this.authService.login(loginId, password);
  }
}
