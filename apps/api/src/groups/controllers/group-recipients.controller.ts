import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { AddGroupRecipientDto } from '../dtos/add-group-recipient.dto';
import { IGroupRecipientService } from '../interfaces/group-recipient';
import { RemoveGroupRecipientParams } from '../../utils/types';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.GROUP_RECIPIENTS)
export class GroupRecipientsController {
  constructor(
    @Inject(Services.GROUP_RECIPIENTS)
    private readonly groupRecipientService: IGroupRecipientService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @Post()
  async addGroupRecipient(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: AddGroupRecipientDto,
  ) {
    const params = {
      userId: user.id,
      email: payload.email,
      id,
    };
    const response = await this.groupRecipientService.addGroupRecipient(params);
    this.eventEmitter.emit('group.user.add', response);
    return response.group;
  }

  /**
   * Leaves a Group
   * @param userId the authenticated user id
   * @param id the id of the group
   * @returns the updated group item of user had left
   */
  @Delete('leave')
  async userLeaveGroup(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const params = { id, userId };
    return this.groupRecipientService.leaveGroup(params);
  }

  @Delete(':userId')
  async removeGroupRecipient(
    @AuthUser() { id: issuerId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) removeUserId: number,
  ) {
    const params: RemoveGroupRecipientParams = {
      issuerId,
      id,
      removeUserId,
    };
    const response = await this.groupRecipientService.removeGroupRecipient(
      params,
    );
    this.eventEmitter.emit('group.user.remove', response);
    return response.group;
  }
}
