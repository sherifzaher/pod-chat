import { CreateFriendParams } from './../utils/types.d';
export interface IFriendsService {
  createFriendRequest(params: CreateFriendParams);
  isFriends(firstUserId: number, secondUserId: number);
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
