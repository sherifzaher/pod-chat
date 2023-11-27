import {
  AcceptFriendRequestParams,
  CreateFriendRequestParams,
  CancelFriendRequestParams,
} from '../utils/types';
export interface IFriendRequestsService {
  createFriendRequest(params: CreateFriendRequestParams);
  acceptFriendRequest(params: AcceptFriendRequestParams);
  cancelFriendRequest(params: CancelFriendRequestParams);
  getFriendRequests(userId: number);
  isFriends(firstUserId: number, secondUserId: number);
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
