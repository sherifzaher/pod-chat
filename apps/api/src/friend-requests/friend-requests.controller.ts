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

import { Routes, ServerEvents, Services } from '../utils/constants';
import { User } from '../utils/typeorm';
import { AuthUser } from '../utils/decorators';
import { IFriendRequestsService } from './friend-requests';
import { CreateFriendDto } from './dtos/create-friend.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

  @Patch(':id/reject')
  handleRejectFriendRequest(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId: user.id };
    return this.friendsService.rejectFriendRequest(params);
  }
}
