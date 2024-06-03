import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserInfo(userUuid: string) {
    return await this.userRepository.getUserInfo(userUuid);
  }

  async updateUserInfo(gender: string, ageRange: string, userUuid: string) {
    return await this.userRepository.updateUserInfo(gender, ageRange, userUuid);
  }
}
