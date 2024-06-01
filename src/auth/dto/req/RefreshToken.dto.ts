import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6IjJlNmUzZWY2LWYyZWQtNDcwNS04NTRmLTgxYmJkYzFmYWM2OSIsImlhdCI6MTcxNzIzODc4MywiZXhwIjoxNzEid9M5MDgzfQ.rDgy9qoi8asd6ZMAgfCb6BW40pVv2oAZu1rJ8JVQ1uM',
  })
  refreshToken: string;
}
