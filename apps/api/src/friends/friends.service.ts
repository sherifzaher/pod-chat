import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFriendsService } from './friends';
import { Friend } from '../utils/typeorm';
import { DeleteFriendRequestParams } from '../utils/types';
import { FriendNotFoundException } from './exceptions/friend-not-found.exception';
import { DeleteFriendException } from './exceptions/delete-friend.exception';

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
  ) {}
  getFriends(id: number) {
    return this.friendsRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: [
        'receiver',
        'sender',
        'sender.profile',
        'receiver.profile',
        'receiver.presence',
        'sender.presence',
      ],
    });
  }

  findFriendById(id: number): Promise<Friend | undefined> {
    return this.friendsRepository.findOne(id, {
      relations: [
        'sender',
        'receiver',
        'receiver.profile',
        'sender.profile',
        'sender.presence',
        'receiver.presence',
      ],
    });
  }

  async deleteFriend({ id, userId }: DeleteFriendRequestParams) {
    const friend = await this.findFriendById(id);
    if (!friend) throw new FriendNotFoundException();
    console.log(friend);
    if (friend.receiver.id !== userId && friend.sender.id !== userId)
      throw new DeleteFriendException();
    await this.friendsRepository.delete(id);
    return friend;
  }

  isFriends(firstUserId: number, secondUserId: number) {
    return this.friendsRepository.findOne({
      where: [
        {
          sender: { id: firstUserId },
          receiver: { id: secondUserId },
        },
        {
          sender: { id: secondUserId },
          receiver: { id: firstUserId },
        },
      ],
    });
  }
}
