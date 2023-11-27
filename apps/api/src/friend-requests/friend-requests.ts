import {
  AcceptFriendRequestParams,
  CreateFriendRequestParams,
} from '../utils/types';
export interface IFriendRequestsService {
  createFriendRequest(params: CreateFriendRequestParams);
  acceptFriendRequest(params: AcceptFriendRequestParams);
  getFriendRequests(userId: number);
  isFriends(firstUserId: number, secondUserId: number);
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
