import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { User } from '../utils/typeorm';
import { AuthUser } from '../utils/decorators';
import { IFriendRequestsService } from './friend-requests';
import { CreateFriendDto } from './dtos/create-friend.dto';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestsController {
  constructor(
    @Inject(Services.FRIEND_REQUESTS)
    private readonly friendsService: IFriendRequestsService,
  ) {}

  @Get()
  handleGetFriendRequests(@AuthUser() user: User) {
    return this.friendsService.getFriendRequests(user.id);
  }

  @Post()
  handleCreateFriend(
    @AuthUser() user: User,
    @Body() createFriendData: CreateFriendDto,
  ) {
    const params = { user, email: createFriendData.email };
    return this.friendsService.createFriendRequest(params);
  }

  @Patch(':id/accept')
  handleAcceptFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    return this.friendsService.acceptFriendRequest(params);
  }

  @Delete(':id/cancel')
  handleCancelFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    return this.friendsService.cancelFriendRequest(params);
  }
}
