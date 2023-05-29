import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    required: true,
    type: String,
    example: 'hsn0najafi',
    uniqueItems: true,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    type: String,
    example: '12345678',
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
