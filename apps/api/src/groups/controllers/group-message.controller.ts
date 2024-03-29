import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Routes, Services } from '../../utils/constants';
import { IGroupMessageService } from '../interfaces/group-message';
import { AuthUser } from '../../utils/decorators';
import { CreateMessageDto } from '../../messages/dtos/CreateMessage.dto';
import { EditMessageDto } from '../../messages/dtos/EditMessage.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedFilesType } from '../../utils/types';
import { EmptyMessageException } from '../../messages/exceptions/empty-message-exception';
import { User } from '../../utils/typeorm';

@Controller(Routes.GROUP_MESSAGES)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGES)
    private readonly groupMessageService: IGroupMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @Throttle(5, 10)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'attachments',
        maxCount: 5,
      },
    ]),
  )
  async createGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() { attachments }: UploadedFilesType,
    @Body() { content }: CreateMessageDto,
  ) {
    console.log(`Creating group message for ${id}`);
    if (!attachments && !content) throw new EmptyMessageException();
    const params = { groupId: id, author: user, content, attachments };
    const response = await this.groupMessageService.createGroupMessage(params);
    
    this.eventEmitter.emit('group.message.create', response);
    return response;
  }

  @Get()
  @SkipThrottle()
  async getGroupMessages(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(`Fetching the group messages for groupID ${id}`);
    const messages = await this.groupMessageService.getGroupMessages(id);

    return {
      id,
      messages,
    };
  }

  @Delete(':messageId')
  @SkipThrottle()
  async deleteGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    await this.groupMessageService.deleteGroupMessage({
      userId: user.id,
      groupId,
      messageId,
    });

    this.eventEmitter.emit('group.message.delete', {
      userId: user.id,
      messageId,
      groupId,
    });

    return {
      groupId,
      messageId,
    };
  }

  @Patch(':messageId')
  @SkipThrottle()
  async updateGroupMessage(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, groupId, messageId };
    const message = await this.groupMessageService.editGroupMessage(params);
    this.eventEmitter.emit('group.message.update', message);
    return message;
  }
}
