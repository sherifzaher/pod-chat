import { Body, Controller, Inject, Post } from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { User } from '../utils/typeorm';
import { AuthUser } from '../utils/decorators';
import { IFriendsService } from './friends';
import { CreateFriendDto } from './dtos/create-friend.dto';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS) private readonly friendsService: IFriendsService,
  ) {}

  @Post()
  handleCreateFriend(
    @AuthUser() user: User,
    @Body() createFriendData: CreateFriendDto,
  ) {
    const params = { user, email: createFriendData.email };
    return this.friendsService.createFriendRequest(params);
  }
}
