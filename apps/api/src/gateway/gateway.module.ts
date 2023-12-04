import { Module } from '@nestjs/common';

import { MessagingGateway } from './gateway';
import { Services } from '../utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { ConversationsModule } from '../conversations/conversations.module';
import { GroupModule } from '../groups/group.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [ConversationsModule, GroupModule, FriendsModule],
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}
