import { Controller, Get, Inject } from '@nestjs/common';

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
}
