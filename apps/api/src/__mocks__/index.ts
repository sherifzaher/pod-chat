import { Profile } from 'src/utils/typeorm/entities/Profile';
import { User } from '../utils/typeorm';

export const mockUser: User = {
  // isOnboardingComplete: false,
  username: 'sherifzaz',
  id: 12313123123,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'Test User',
  password: '123123',
  messages: [],
  groups: [],
  profile: new Profile(),
};
