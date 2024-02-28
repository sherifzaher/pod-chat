import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Services } from '../utils/constants';
import { FriendRequestsService } from './friend-requests.service';
import { Friend, FriendRequest } from '../utils/typeorm';
import { FriendRequestsController } from './friend-requests.controller';
import { UsersModule } from '../users/users.module';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest, Friend]),
    UsersModule,
    FriendsModule,
  ],
  controllers: [FriendRequestsController],
  providers: [
    {
      provide: Services.FRIEND_REQUESTS,
      useClass: FriendRequestsService,
    },
  ],
  exports: [
    {
      provide: Services.FRIEND_REQUESTS,
      useClass: FriendRequestsService,
    },
  ],
})
export class FriendRequestsModule {}
