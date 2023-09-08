import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGroupRecipientService } from '../interfaces/group-recipient';
import { Services } from '../../utils/constants';
import { IUserService } from '../../users/user';
import { IGroupService } from '../interfaces/group';
import {
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
} from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/group-not-found-exception';
import { NotGroupOwnerException } from '../exceptions/not-group-owner-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../utils/typeorm';
import { Repository } from 'typeorm';

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
    if (!group)
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    console.log(group);

    const recipient = await this.userService.findUser({ email: params.email });
    if (!recipient)
      throw new HttpException(
        'Cannot add user to group',
        HttpStatus.BAD_REQUEST,
      );

    if (group.creator.id !== params.userId)
      throw new HttpException('Insufficient Permissions', HttpStatus.FORBIDDEN);

    const isInGroup = group.users.find((user) => user.id === recipient.id);
    if (isInGroup)
      throw new HttpException('User already in group', HttpStatus.BAD_REQUEST);

    group.users = [...group.users, recipient];
    return this.groupService.saveGroup(group);
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
    if (!group) throw new GroupNotFoundException();
    // temporary solution.....
    if (group.creator.id !== issuerId) throw new NotGroupOwnerException();
    if (group.creator.id === removeUserId)
      throw new HttpException(
        "You're the group owner.",
        HttpStatus.BAD_REQUEST,
      );

    group.users = group.users.filter((user) => user.id !== params.removeUserId);
    return this.groupService.saveGroup(group);
  }
}
