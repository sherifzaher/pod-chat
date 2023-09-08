import { Module } from '@nestjs/common';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { Services } from '../utils/constants';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, GroupMessage } from '../utils/typeorm';
import { GroupMessageController } from './controllers/group-message.controller';
import { GroupMessageService } from './services/group-message.service';
import { GroupRecipientsController } from './controllers/group-recipients.controller';
import { GroupRecipientService } from './services/group-recipient.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group, GroupMessage])],
  controllers: [
    GroupController,
    GroupMessageController,
    GroupRecipientsController,
  ],
  providers: [
    {
      provide: Services.GROUPS_SERVICE,
      useClass: GroupService,
    },
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
    {
      provide: Services.GROUP_RECIPIENTS,
      useClass: GroupRecipientService,
    },
  ],
  exports: [
    {
      provide: Services.GROUPS_SERVICE,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
