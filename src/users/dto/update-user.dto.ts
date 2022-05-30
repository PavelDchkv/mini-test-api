import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly email?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly password?: string;

  @ApiPropertyOptional()
  readonly tariff?: string;

  @ApiPropertyOptional()
  readonly firstName?: string;

  @ApiPropertyOptional()
  readonly lastName?: string;
}
