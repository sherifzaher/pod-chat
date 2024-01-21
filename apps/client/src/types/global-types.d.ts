type ConversationType = {
  id: number;
  name: string;
  lastMessage: string;
};

type CreateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

type UserCredentialsParams = {
  username: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: Message;
};

type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
};

type FetchMessagePayload = {
  id: number;
  messages: Message[];
};

type FetchMessagesProps = {
  id: number;
  skip: number;
};

type MessageEventPayload = {
  message: Message;
  conversation: Conversation;
};

type CreateMessageParams = {
  id: number;
  content: string;
};

type CreateConversationParams = {
  username: string;
  message: string;
};

type DeleteMessageParams = {
  conversationId: number;
  messageId: number;
};

type DeleteGroupMessageParams = {
  groupId: number;
  messageId: number;
};

type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

type MessagePayload = {
  messageId: number;
  content: string;
};

type EditMessagePayload = {
  conversationId: number;
} & MessagePayload;

type EditGroupMessagePayload = {
  groupId: number;
} & MessagePayload;

type ConversationSelectedType = 'private' | 'group';

type ConversationTypeData = {
  type: ConversationSelectedType;
  label: string;
};

type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: Message[];
  createdAt: number;
  lastMessageSent: Message;
  lastMessageSentAt: Date;
};

type GroupMessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  group: Group;
};

type FetchGroupMessagePayload = {
  id: number;
  messages: GroupMessageType[];
};

type GroupMessage = {
  id: number;
  messages: GroupMessageType[];
};

type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};

type CreateGroupParams = {
  users: string[];
  title: string;
};

type AddGroupRecipientParams = {
  id: number;
  username: string;
};

type RemoveGroupRecipientParams = {
  id: number;
  userId: number;
};

type Points = {
  x: number;
  y: number;
};

type UserContextMenuActionType = 'kick' | 'transfer_owner' | 'profile';
type ContextMenuItemType = {
  label: string;
  action: UserContextMenuActionType;
  color: string;
  ownerOnly: boolean;
};

type AddGroupUserMessagePayload = {
  group: Group;
  user: User;
};

type RemoveGroupUserPayload = {
  group: Group;
  user: User;
};

type UpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};

type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

type Friend = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
};

type FriendRequest = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
  status: FriendRequestStatus;
};

type HandleFriendRequestAction = 'accept' | 'reject';

type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

type RateLimitType = 'group' | 'private';

type UpdateRateLimitPayload = {
  type: RateLimitType;
  status: boolean;
};
