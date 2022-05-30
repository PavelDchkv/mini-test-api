import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username?: string;

  @IsNotEmpty()
  readonly email?: string;

  @IsNotEmpty()
  readonly password?: string;

  readonly tariff?: string;
  readonly firstName?: string;
  readonly lastName?: string;
}
