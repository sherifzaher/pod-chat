import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Services } from '../utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peer, Profile, User, UserPresence } from '../utils/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserProfileController } from './controllers/user-profile.controller';
import { UserProfileService } from './services/user-profile.service';
import { UserPresenceController } from './controllers/user-presence.controller';
import { UserPresenceService } from './services/user-presence.service';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([User, Profile, UserPresence, Peer]),
  ],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
  controllers: [UserController, UserProfileController, UserPresenceController],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
})
export class UsersModule {}
