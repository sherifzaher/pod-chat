import { IsNotEmpty, MinLength } from 'class-validator';

export class AddGroupRecipientDto {
  @MinLength(3)
  @IsNotEmpty()
  username: string;
}
