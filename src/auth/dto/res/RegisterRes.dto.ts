import { ApiProperty } from '@nestjs/swagger';

export class RegisterResDto {
  @ApiProperty({
    example: 'user user1234 is created',
  })
  message: string;
}
