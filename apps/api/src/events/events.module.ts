import { Module } from '@nestjs/common';
import { FriendRequestsEvents } from './friend-requests.events';
import { MessagingGateway } from 'src/gateway/gateway';
import { GatewayModule } from 'src/gateway/gateway.module';
import { FriendsEvents } from './friends.events';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents, FriendsEvents],
})
export class EventsModule {}
