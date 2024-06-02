import { ApiProperty } from '@nestjs/swagger';

export class DeleteLookBookResDto {
  @ApiProperty({
    example: 'LookBook with id 1 has been successfully deleted',
  })
  message: string;
}
