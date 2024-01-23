import {MulterField} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  USERS_PROFILES = 'users/profiles',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  GROUPS = 'groups',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = '/groups/:id/recipients',
  EXISTS = 'exists',
  FRIENDS = 'friends',
  FRIEND_REQUESTS = 'friend-requests',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  USERS_PROFILES = 'USERS_PROFILES_SERVICE',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGES_SERVICE',
  MESSAGES_ATTACHMENTS = 'MESSAGES_ATTACHMENTS_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  GROUPS_SERVICE = 'GROUPS_SERVICE',
  GROUP_MESSAGES = 'GROUP_MESSAGES',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENT_SERVICE',
  FRIENDS = 'FRIENDS_SERVICE',
  FRIEND_REQUESTS = 'FRIENDS_REQUESTS_SERVICE',
  CLOUDINARY = 'CLOUDINARY',
  CLOUDINARY_SERVICE = 'CLOUDINARY_SERVICE',
}

export enum ServerEvents {
  FRIEND_REQUEST_ACCEPTED = 'friend.request.accepted',
  FRIEND_REQUEST_REJECTED = 'friend.request.rejected',
  FRIEND_REQUEST_CANCELLED = 'friend.request.cancelled',
  FRIEND_REQUEST_CREATED = 'friend.request.created',
  FRIEND_REMOVED = 'friend.removed',
}

export enum WebsocketEvents {
  FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
  FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
  FRIEND_REQUEST_CANCELLED = 'onFriendRequestCancelled',
  FRIEND_REQUEST_RECEIVED = 'onFriendRequestReceived',
}

export const UserProfileFileFields: MulterField[] = [
  {
    name: 'banner',
    maxCount: 1,
  },
  {
    name: 'avatar',
    maxCount: 1,
  },
];
