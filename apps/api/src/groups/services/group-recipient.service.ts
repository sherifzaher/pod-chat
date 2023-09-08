import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGroupRecipientService } from '../interfaces/group-recipient';
import { Services } from '../../utils/constants';
import { IUserService } from '../../users/user';
import { IGroupService } from '../interfaces/group';
import { AddGroupRecipientParams } from '../../utils/types';

@Injectable()
export class GroupRecipientService implements IGroupRecipientService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    @Inject(Services.GROUPS_SERVICE)
    private readonly groupService: IGroupService,
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
}
