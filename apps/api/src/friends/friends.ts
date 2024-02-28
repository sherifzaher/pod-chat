import { DeleteFriendRequestParams } from '../utils/types';
import { Friend } from '../utils/typeorm';

export interface IFriendsService {
  getFriends(id: number): Promise<Friend[]>;
  findFriendById(id: number): Promise<Friend | undefined>;
  deleteFriend(params: DeleteFriendRequestParams);
  isFriends(
    firstUserId: number,
    secondUserId: number,
  ): Promise<Friend | undefined>;
}
