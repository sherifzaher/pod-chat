import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { Routes, ServerEvents, Services } from '../utils/constants';
import { IFriendsService } from './friends';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { SkipThrottle } from '@nestjs/throttler';
import { EventEmitter2 } from '@nestjs/event-emitter';

@SkipThrottle()
@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS) private readonly friendsService: IFriendsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  handleGetFriends(@AuthUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  async deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const friend = await this.friendsService.deleteFriend({
      id,
      userId,
    });

    this.eventEmitter.emit(ServerEvents.FRIEND_REMOVED, { friend, userId });
    return friend;
  }
}
