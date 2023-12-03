import { FriendRequestNotFoundException } from './exceptions/friend-request-not-found.exception';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFriendRequestsService } from './friend-requests';
import {
  AcceptFriendRequestParams,
  CancelFriendRequestParams,
  CreateFriendRequestParams,
} from '../utils/types';
import { Friend, FriendRequest } from '../utils/typeorm';
import { Services } from '../utils/constants';
import { IUserService } from '../users/user';
import { UserNotFoundException } from '../groups/exceptions/user-not-found-exception';
import { FriendShipFoundException } from './exceptions/friendship-found.exception';
import { CannotAcceptRequestException } from './exceptions/cannot-accept-request.exception';
import { CannotCancelRequestException } from './exceptions/cannot-cancel-request.exception';

@Injectable()
export class FriendRequestsService implements IFriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestsRepository: Repository<FriendRequest>,
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async createFriendRequest(params: CreateFriendRequestParams) {
    const userIsFound = await this.userService.findUser({
      email: params.email,
    });
    if (!userIsFound) throw new UserNotFoundException();

    const friendShipExist = await this.isFriendRequestPending(
      params.user.id,
      userIsFound.id,
    );
    if (friendShipExist) throw new FriendShipFoundException();

    const friendRequest = this.friendRequestsRepository.create({
      sender: params.user,
      receiver: userIsFound,
      status: 'pending',
    });

    return this.friendRequestsRepository.save(friendRequest);
  }

  async cancelFriendRequest(params: CancelFriendRequestParams) {
    const foundRequest = await this.friendRequestsRepository.findOne({
      where: { id: params.id },
      relations: ['receiver', 'sender'],
    });
    if (!foundRequest) throw new FriendRequestNotFoundException();

    if (foundRequest.sender.id !== params.userId)
      throw new CannotCancelRequestException();

    await this.friendRequestsRepository.delete(params.id);
    return foundRequest;
  }

  async rejectFriendRequest(params: CancelFriendRequestParams) {
    const foundRequest = await this.friendRequestsRepository.findOne({
      where: { id: params.id },
      relations: ['receiver', 'sender'],
    });
    if (!foundRequest) throw new FriendRequestNotFoundException();

    if (foundRequest.status === 'accepted')
      throw new FriendShipFoundException();

    if (foundRequest.receiver.id !== params.userId)
      throw new CannotCancelRequestException();

    foundRequest.status = 'rejected';
    return this.friendRequestsRepository.save(foundRequest);
  }

  getFriendRequests(id: number) {
    return this.friendRequestsRepository.find({
      where: [
        {
          receiver: { id },
          status: 'pending',
        },
        {
          sender: { id },
          status: 'pending',
        },
      ],
      relations: ['receiver', 'sender'],
    });
  }

  async acceptFriendRequest(params: AcceptFriendRequestParams) {
    const friendRequest = await this.friendRequestsRepository.findOne({
      where: {
        id: params.id,
      },
      relations: ['receiver', 'sender'],
    });
    if (!friendRequest) throw new FriendRequestNotFoundException();

    if (friendRequest.status === 'accepted')
      throw new FriendShipFoundException();

    if (friendRequest.receiver.id !== params.userId)
      throw new CannotAcceptRequestException();

    friendRequest.status = 'accepted';

    const updateFriendRequest = await this.friendRequestsRepository.save(
      friendRequest,
    );

    const newFriend = this.friendsRepository.create({
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    });

    const friend = await this.friendsRepository.save(newFriend);
    return { friend, friendRequest: updateFriendRequest };
  }

  isFriends(firstUserId: number, secondUserId: number) {
    return this.friendsRepository.findOne({
      where: [
        {
          sender: { id: firstUserId },
          receiver: { id: secondUserId },
          status: 'accepted',
        },
        {
          sender: { id: secondUserId },
          receiver: { id: firstUserId },
          status: 'accepted',
        },
      ],
    });
  }

  isFriendRequestPending(firstUserId: number, secondUserId: number) {
    return this.friendRequestsRepository.findOne({
      where: [
        {
          sender: { id: firstUserId },
          receiver: { id: secondUserId },
          status: 'pending',
        },
        {
          sender: { id: secondUserId },
          receiver: { id: firstUserId },
          status: 'pending',
        },
      ],
    });
  }
}
