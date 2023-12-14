import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  username: string;

  @IsString()
  @MaxLength(200)
  about?: string;
}
