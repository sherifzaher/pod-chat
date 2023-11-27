import { Module } from '@nestjs/common';

import { Services } from '../utils/constants';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';

@Module({
  controllers: [FriendsController],
  providers: [
    {
      provide: Services.FRIENDS,
      useClass: FriendsService,
    },
  ],
  exports: [
    {
      provide: Services.FRIENDS,
      useClass: FriendsService,
    },
  ],
})
export class FriendsModule {}
