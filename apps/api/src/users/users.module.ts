import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Services } from '../utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../utils/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
