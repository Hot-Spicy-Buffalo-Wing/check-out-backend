import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/req/login.dto';
import { RegisterDtoDto } from './dto/req/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() { name, registerId, password }: RegisterDtoDto) {
    return this.authService.register(name, registerId, password);
  }

  @Post('login')
  login(@Body() { loginId, password }: LoginDto) {
    return this.authService.login(loginId, password);
  }
}
