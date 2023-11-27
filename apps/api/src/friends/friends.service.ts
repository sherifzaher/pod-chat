import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IFriendsService } from './friends';
import { Friend } from '../utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
  ) {}
  getFriends(id: number) {
    return this.friendsRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: ['receiver', 'sender'],
    });
  }
}
