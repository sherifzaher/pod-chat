import { FriendRequest } from 'src/utils/typeorm';
import {
  AcceptFriendRequestParams,
  CreateFriendRequestParams,
  CancelFriendRequestParams,
  RejectFriendRequestParams,
  AcceptFriendRequestResponse,
} from '../utils/types';
export interface IFriendRequestsService {
  createFriendRequest(params: CreateFriendRequestParams);
  acceptFriendRequest(
    params: AcceptFriendRequestParams,
  ): Promise<AcceptFriendRequestResponse>;
  cancelFriendRequest(
    params: CancelFriendRequestParams,
  ): Promise<FriendRequest>;
  rejectFriendRequest(params: RejectFriendRequestParams);
  getFriendRequests(userId: number);
  isFriends(firstUserId: number, secondUserId: number);
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
