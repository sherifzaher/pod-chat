import { FriendRequest } from '../utils/typeorm';
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
  isFriendRequestPending(firstUserId: number, secondUserId: number);
}
