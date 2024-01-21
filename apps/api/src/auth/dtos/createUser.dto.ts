import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(16)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string;
}
