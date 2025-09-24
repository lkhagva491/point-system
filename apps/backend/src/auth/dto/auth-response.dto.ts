import { ApiProperty } from '@nestjs/swagger';
import { User } from '@point-system/shared';

export class AuthResponseDto {
  @ApiProperty({ type: 'object', description: 'User information' })
  user: User;

  @ApiProperty({ description: 'JWT token' })
  token: string;
}
