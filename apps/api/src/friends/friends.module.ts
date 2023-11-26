import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Services } from '../utils/constants';
import { FriendsService } from './friends.service';
import { Friend } from '../utils/typeorm';
import { FriendsController } from './friends.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule],
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
