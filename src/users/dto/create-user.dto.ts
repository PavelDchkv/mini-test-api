import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Type of subscription on the website',
    required: false,
    default: '',
  })
  readonly tariff?: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  readonly firstName?: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  readonly lastName?: string;
}
