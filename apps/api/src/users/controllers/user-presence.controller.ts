import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { IUserPresenceService } from '../interfaces/user-presence';
import { AuthenticationGuard } from 'src/auth/utils/Guards';
import { UpdatePresenceStatusDto } from '../dto/update-presence-status.dto';

@UseGuards(AuthenticationGuard)
@Controller(Routes.USER_PRESENCE)
export class UserPresenceController {
  constructor(
    @Inject(Services.USER_PRESENCE)
    private readonly userPresenceService: IUserPresenceService,
  ) {}

  @Patch('status')
  updateStatus(
    @AuthUser() user: User,
    @Body() { statusMessage }: UpdatePresenceStatusDto,
  ) {
    return this.userPresenceService.updateStatus({ user, statusMessage });
  }
}
