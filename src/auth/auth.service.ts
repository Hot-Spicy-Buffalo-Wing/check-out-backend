import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async register(name: string, registerId: string, password: string) {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.authRepository.register(name, registerId, hash);
  }

  async login(loginId: string, password: string) {
    return this.authRepository.login(loginId, password);
  }

  async refreshToken(refreshToken: string) {
    return this.authRepository.refreshToken(refreshToken);
  }
}
