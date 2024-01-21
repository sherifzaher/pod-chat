import { MinLength, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @MinLength(3)
  @IsNotEmpty()
  username: string;
}
