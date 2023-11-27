import { Conversation, Group, GroupMessage, Message, User } from './typeorm';
import { Request } from 'express';

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateConversationParams = {
  email: string;
  message: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};

export type CreateMessageResponse = {
  message: Message;
  conversation: Conversation;
};

export type DeleteMessageParams = {
  userId: number;
  conversationId: number;
  messageId: number;
};

export type EditMessageParams = {
  conversationId: number;
  messageId: number;
  userId: number;
  content: string;
};

export type CreateGroupParams = {
  creator: User;
  title?: string;
  users: string[];
};

export type FetchGroupParams = {
  userId: number;
};

export type CreateGroupMessageParams = {
  groupId: number;
  content: string;
  author: User;
};

export type CreateGroupMessageResponse = {
  message: GroupMessage;
  group: Group;
};

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;

export type DeleteGroupMessageParams = {
  userId: number;
  groupId: number;
  messageId: number;
};

export type EditGroupMessageParams = {
  groupId: number;
  userId: number;
  content: string;
  messageId: number;
};

export type AddGroupRecipientParams = {
  userId: number;
  email: string;
  id: number;
};

export type RemoveGroupRecipientParams = {
  id: number;
  removeUserId: number;
  issuerId: number;
};

export type AddGroupUserResponse = {
  group: Group;
  user: User;
};

export type RemoveGroupUserResponse = {
  group: Group;
  user: User;
};

export type TransferOwnerParams = {
  userId: number;
  groupId: number;
  newOwnerId: number;
};

export type LeaveGroupParams = {
  id: number;
  userId: number;
};

export type CheckUserGroupParams = {
  id: number;
  userId: number;
};

export type CreateFriendRequestParams = {
  user: User;
  email: string;
};

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

export type AcceptFriendRequestParams = {
  id: number;
  userId: number;
};

export type CancelFriendRequestParams = {
  id: number;
  userId: number;
};

export type RejectFriendRequestParams = {
  id: number;
  userId: number;
};
