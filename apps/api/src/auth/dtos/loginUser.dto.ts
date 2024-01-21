import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
