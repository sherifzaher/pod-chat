import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IUserProfile } from '../interfaces/user-profile';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }

  findProfile() {}
  async updateProfile(user: User, params: UpdateUserProfileParams) {
    const userHasProfile = user?.profile?.id;
    if (!user.profile) {
      user.profile = new Profile();
    }

    if (params.banner) {
      const uploadResponse = await this.cloudinaryService.uploadImage(
        params.banner,
      );
      user.profile.banner = uploadResponse?.url;
    }

    if (params.avatar) {
      const uploadResponse = await this.cloudinaryService.uploadImage(
        params.avatar,
      );
      user.profile.avatar = uploadResponse?.url;
    }
    if (params.about) user.profile.about = params.about;

    !userHasProfile && (await this.profileRepository.save(user.profile));
    return this.userRepository.save(user);
  }
}
