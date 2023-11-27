import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { IFriendsService } from './friends';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS) private readonly friendsService: IFriendsService,
  ) {}

  @Get()
  handleGetFriends(@AuthUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendsService.deleteFriend({ id, userId });
  }
}
