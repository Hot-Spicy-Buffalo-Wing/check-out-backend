import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
