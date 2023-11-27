import { Friend } from '../utils/typeorm';

export interface IFriendsService {
  getFriends(userId: number): Promise<Friend[]>;
}
