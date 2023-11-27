import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Services } from '../utils/constants';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Friend } from '../utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
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
