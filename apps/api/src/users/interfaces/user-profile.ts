import { UpdateUserProfileParams } from '../../utils/types';
import { User } from '../../utils/typeorm';

export interface IUserProfile {
  findProfile();
  createProfile();
  updateProfile(user: User, params: UpdateUserProfileParams);
}
