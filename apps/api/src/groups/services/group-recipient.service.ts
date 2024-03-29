import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGroupRecipientService } from '../interfaces/group-recipient';
import { Services } from '../../utils/constants';
import { IUserService } from '../../users/user';
import { IGroupService } from '../interfaces/group';
import {
  AddGroupRecipientParams,
  CheckUserGroupParams,
  LeaveGroupParams,
  RemoveGroupRecipientParams,
} from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/group-not-found-exception';
import { NotGroupOwnerException } from '../exceptions/not-group-owner-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../utils/typeorm';
import { Repository } from 'typeorm';
import { GroupParticipantNotFound } from '../exceptions/group-participant-not-found';

@Injectable()
export class GroupRecipientService implements IGroupRecipientService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    @Inject(Services.GROUPS_SERVICE)
    private readonly groupService: IGroupService,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  async addGroupRecipient(params: AddGroupRecipientParams) {
    const group = await this.groupService.findGroupById(params.id);
    if (!group) throw new GroupNotFoundException();

    if (group.owner.id !== params.userId)
      throw new HttpException('Insufficient Permissions', HttpStatus.FORBIDDEN);

    const recipient = await this.userService.findUser({
      username: params.username,
    });
    if (!recipient)
      throw new HttpException(
        'Cannot add user to group',
        HttpStatus.BAD_REQUEST,
      );

    const isInGroup = group.users.find((user) => user.id === recipient.id);
    if (isInGroup)
      throw new HttpException('User already in group', HttpStatus.BAD_REQUEST);

    group.users = [...group.users, recipient];
    const savedGroup = await this.groupService.saveGroup(group);
    return { group: savedGroup, user: recipient };
  }

  /**
   * Removes a Group Recipient as a Group Owner.
   * Does not allow users to leave the group.
   * @param params RemoveGroupRecipientParams
   * @returns Promise<Group>
   * */
  async removeGroupRecipient(params: RemoveGroupRecipientParams) {
    const { issuerId, id, removeUserId } = params;
    const group = await this.groupService.findGroupById(id);
    const userToBeRemoved = await this.userService.findUser({
      id: removeUserId,
    });
    if (!userToBeRemoved)
      throw new HttpException('User cannot be removed', HttpStatus.BAD_REQUEST);
    if (!group) throw new GroupNotFoundException();
    // temporary solution.....
    if (group.owner.id !== issuerId) throw new NotGroupOwnerException();
    if (group.owner.id === removeUserId)
      throw new HttpException(
        "You're the group owner.",
        HttpStatus.BAD_REQUEST,
      );

    group.users = group.users.filter((user) => user.id !== params.removeUserId);
    const savedGroup = await this.groupService.saveGroup(group);
    return { group: savedGroup, user: userToBeRemoved };
  }

  async isUserInGroup(params: CheckUserGroupParams) {
    const group = await this.groupService.findGroupById(params.id);
    if (!group) throw new GroupNotFoundException();
    const user = group.users.find((user) => user.id === params.userId);
    if (!user) throw new GroupParticipantNotFound();
    return group;
  }

  async leaveGroup({ id: groupId, userId }: LeaveGroupParams) {
    const group = await this.isUserInGroup({ id: groupId, userId });
    const updatedUsers = group.users.filter((user) => user.id !== userId);
    if (group.owner.id === userId)
      throw new HttpException(
        'Cannot leave group as owner',
        HttpStatus.BAD_REQUEST,
      );

    group.users = updatedUsers;
    return this.groupRepository.save(group);
  }
}
