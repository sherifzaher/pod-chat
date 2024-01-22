import {
  Body,
  Controller,
  Inject,
  Patch,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { Routes, Services, UserProfileFileFields } from '../../utils/constants';
import { IUserProfile } from '../interfaces/user-profile';
import { UpdateUserProfileParams, UserProfileFiles } from '../../utils/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Controller(Routes.USERS_PROFILES)
export class UserProfileController {
  constructor(
    @Inject(Services.USERS_PROFILES)
    private readonly userProfileService: IUserProfile,
  ) {}

  @Patch()
  @UseInterceptors(FileFieldsInterceptor(UserProfileFileFields))
  async updateUserProfile(
    @UploadedFiles() files: UserProfileFiles,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const params: UpdateUserProfileParams = {};
    updateUserProfileDto.about && (params.about = updateUserProfileDto.about);
    files.avatar && (params.avatar = files.avatar[0]);
    files.banner && (params.banner = files.banner[0]);
    await this.userProfileService.updateProfile(params);
  }
}
