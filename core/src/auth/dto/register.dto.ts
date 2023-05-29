import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: 'Name of the user',
    required: true,
    type: String,
    example: 'Hossein',
  })
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  name: string;
}
