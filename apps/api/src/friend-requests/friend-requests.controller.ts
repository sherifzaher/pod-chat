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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Throttle } from '@nestjs/throttler';

import { Routes, ServerEvents, Services } from '../utils/constants';
import { User } from '../utils/typeorm';
import { AuthUser } from '../utils/decorators';
import { IFriendRequestsService } from './friend-requests';
import { CreateFriendDto } from './dtos/create-friend.dto';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestsController {
  constructor(
    @Inject(Services.FRIEND_REQUESTS)
    private readonly friendsService: IFriendRequestsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  handleGetFriendRequests(@AuthUser() user: User) {
    return this.friendsService.getFriendRequests(user.id);
  }

  @Throttle(3, 10)
  @Post()
  async handleCreateFriend(
    @AuthUser() user: User,
    @Body() createFriendData: CreateFriendDto,
  ) {
    const params = { user, email: createFriendData.email };
    const friendRequest = await this.friendsService.createFriendRequest(params);
    this.eventEmitter.emit(ServerEvents.FRIEND_REQUEST_CREATED, friendRequest);
    return friendRequest;
  }

  @Throttle(3, 10)
  @Patch(':id/accept')
  async handleAcceptFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    const response = await this.friendsService.acceptFriendRequest(params);
    this.eventEmitter.emit(ServerEvents.FRIEND_REQUEST_ACCEPTED, response);
    return response;
  }

  @Throttle(3, 10)
  @Delete(':id/cancel')
  async handleCancelFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    const friendRequest = await this.friendsService.cancelFriendRequest(params);
    this.eventEmitter.emit(
      ServerEvents.FRIEND_REQUEST_CANCELLED,
      friendRequest,
    );
    return friendRequest;
  }

  @Throttle(3, 10)
  @Patch(':id/reject')
  async handleRejectFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    const friendRequest = await this.friendsService.rejectFriendRequest(params);
    this.eventEmitter.emit(ServerEvents.FRIEND_REQUEST_REJECTED, friendRequest);
    return friendRequest;
  }
}
