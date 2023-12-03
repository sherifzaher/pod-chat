import { FriendRequest } from 'src/utils/typeorm';
import {
  AcceptFriendRequestParams,
  CreateFriendRequestParams,
  CancelFriendRequestParams,
  RejectFriendRequestParams,
} from '../utils/types';
export interface IFriendRequestsService {
  createFriendRequest(params: CreateFriendRequestParams);
  acceptFriendRequest(params: AcceptFriendRequestParams);
  cancelFriendRequest(
    params: CancelFriendRequestParams,
  ): Promise<FriendRequest>;
  rejectFriendRequest(params: RejectFriendRequestParams);
  getFriendRequests(userId: number);
  isFriends(firstUserId: number, secondUserId: number);
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
