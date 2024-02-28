import { Module } from '@nestjs/common';
import { FriendRequestsEvents } from './friend-requests.events';
import { FriendsEvents } from './friends.events';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents, FriendsEvents],
})
export class EventsModule {}
