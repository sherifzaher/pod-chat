import { Profile, User } from '../utils/typeorm';

export const mockUser: Partial<User> = {
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
