import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFriendsService } from './friends';
import { CreateFriendParams } from '../utils/types';
import { Friend } from '../utils/typeorm';
import { Services } from '../utils/constants';
import { IUserService } from '../users/user';
import { UserNotFoundException } from './../groups/exceptions/user-not-found-exception';
import { FriendShipFoundException } from './exceptions/friendship-found.exception';

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async createFriendRequest(params: CreateFriendParams) {
    const userIsFound = await this.userService.findUser({
      email: params.email,
    });
    if (!userIsFound) throw new UserNotFoundException();

    const friendShipExist = await this.isFriendRequestPending(
      params.user.id,
      userIsFound.id,
    );
    if (friendShipExist) throw new FriendShipFoundException();

    const friend = this.friendsRepository.create({
      sender: params.user,
      receiver: userIsFound,
      status: 'pending',
    });

    return this.friendsRepository.save(friend);
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
    return this.friendsRepository.findOne({
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
