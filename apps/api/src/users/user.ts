import { Profile, User } from '../utils/typeorm';
import {
  CompleteOnboarding,
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from '../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(findUser: FindUserParams, options?: FindUserOptions): Promise<User | undefined>;
  saveUser(user: User): Promise<User>;
  searchUsers(param: string): Promise<User[]>;
  completeOnboarding(data: CompleteOnboarding): Promise<void>;
}
