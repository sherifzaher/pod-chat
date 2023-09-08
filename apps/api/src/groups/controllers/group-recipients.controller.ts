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

@Controller(Routes.GROUP_RECIPIENTS)
export class GroupRecipientsController {
  constructor(
    @Inject(Services.GROUP_RECIPIENTS)
    private readonly groupRecipientService: IGroupRecipientService,
  ) {}
  @Post()
  addGroupRecipient(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: AddGroupRecipientDto,
  ) {
    const params = {
      userId: user.id,
      email: payload.email,
      id,
    };
    return this.groupRecipientService.addGroupRecipient(params);
  }

  @Delete(':userId')
  removeGroupRecipient(
    @AuthUser() { id: issuerId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) removeUserId: number,
  ) {
    const params: RemoveGroupRecipientParams = {
      issuerId,
      id,
      removeUserId,
    };
    return this.groupRecipientService.removeGroupRecipient(params);
  }
}
