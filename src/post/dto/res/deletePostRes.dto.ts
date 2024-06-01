import { ApiProperty } from '@nestjs/swagger';

export class deletePostResDto {
  @ApiProperty({
    example: 'post with id 1 has been successfully deleted',
  })
  message: string;
}
