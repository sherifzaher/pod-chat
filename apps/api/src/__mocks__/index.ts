import { User } from '../utils/typeorm';

export const mockUser: User = {
  id: 12313,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'Test User',
  password: '123123',
  messages: [],
  groups: [],
};
