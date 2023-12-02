import { Module } from '@nestjs/common';
import { FriendRequestsEvents } from './friend-requests.events';
import { MessagingGateway } from 'src/gateway/gateway';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents],
})
export class EventsModule {}
