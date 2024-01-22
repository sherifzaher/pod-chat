import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IUserProfile } from '../interfaces/user-profile';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  findProfile() {}
  updateProfile(params: UpdateUserProfileParams) {}
}
