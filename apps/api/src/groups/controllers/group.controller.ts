import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Routes, Services } from '../../utils/constants';
import { IGroupService } from '../interfaces/group';
import { AuthUser } from '../../utils/decorators';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { User } from 'src/utils/typeorm/entities/User';
import { TransferOwnerDto } from '../dtos/transfer-owner.dto';

@Controller(Routes.GROUPS)
export class GroupController {
  constructor(
    @Inject(Services.GROUPS_SERVICE)
    private readonly groupService: IGroupService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createGroup(
    @AuthUser() user: User,
    @Body() createGroupPayload: CreateGroupDto,
  ) {
    const createdGroup = await this.groupService.createGroup({
      ...createGroupPayload,
      creator: user,
    });

    this.eventEmitter.emit('group.create', createdGroup);

    return createdGroup;
  }

  @Get()
  async getGroups(@AuthUser() user: User) {
    return this.groupService.getGroups({ userId: user.id });
  }

  @Get(':id')
  getGroup(@AuthUser() user: User, @Param('id') groupId: number) {
    return this.groupService.findGroupById(groupId);
  }

  /**
   * Route: /api/groups/:id/owner
   */
  @Patch(':id/owner')
  async updateGroupOwner(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Body() { newOwnerId }: TransferOwnerDto,
  ) {
    const params = { newOwnerId, userId, groupId };
    const group = await this.groupService.transferGroupOwner(params);
    this.eventEmitter.emit('group.owner.update', group);
    return group;
  }
}
