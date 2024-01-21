import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from '../../utils/typeorm';
import { IGroupService } from '../interfaces/group';
import { Services } from '../../utils/constants';
import { IUserService } from '../../users/user';
import {
  CreateGroupParams,
  FetchGroupParams,
  TransferOwnerParams,
} from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/group-not-found-exception';
import { NotGroupOwnerException } from '../exceptions/not-group-owner-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';
import { GroupOwnerTransferException } from '../exceptions/group-owner-transfer-exception';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(Services.USERS)
    private readonly userServices: IUserService,
  ) {}
  async createGroup(params: CreateGroupParams) {
    const { creator, title } = params;
    const usersPromise = params.users.map((username) =>
      this.userServices.findUser({ username }),
    );
    const users = (await Promise.all(usersPromise)).filter((user) => user);
    users.push(creator);
    const groupParams = { users, creator, title, owner: creator };
    const group = this.groupRepository.create(groupParams);
    return this.groupRepository.save(group);
  }

  getGroups(params: FetchGroupParams): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('user.id  IN (:users)', { users: [params.userId] })
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('group.creator', 'creator')
      .leftJoinAndSelect('group.owner', 'owner')
      .getMany();
  }

  findGroupById(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['creator', 'users', 'lastMessageSent', 'owner'],
    });
  }

  saveGroup(params: Group): Promise<Group> {
    return this.groupRepository.save(params);
  }

  async hasAccess(groupId: number, userId: number) {
    const group = await this.groupRepository.findOne(groupId, {
      relations: ['users'],
    });
    if (!group) throw new GroupNotFoundException();

    return group.users.find((user) => user.id === userId);
  }

  async transferGroupOwner(params: TransferOwnerParams): Promise<Group> {
    const { userId, groupId, newOwnerId } = params;
    const group = await this.findGroupById(groupId);
    if (!group) throw new GroupNotFoundException();
    if (group.owner.id === newOwnerId)
      throw new GroupOwnerTransferException(
        'Cannot transfer owner to yourself',
      );
    if (group.owner.id !== userId)
      throw new GroupOwnerTransferException('Insufficient Permissions');

    if (group.owner.id !== userId) throw new NotGroupOwnerException();
    const newOwner = await this.userServices.findUser({ id: newOwnerId });
    if (!newOwner) throw new UserNotFoundException();

    group.owner = newOwner;
    return this.groupRepository.save(group);
  }
}
