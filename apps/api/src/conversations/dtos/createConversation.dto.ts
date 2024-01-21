import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
