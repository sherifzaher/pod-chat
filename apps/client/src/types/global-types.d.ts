type ConversationType = {
  id: number;
  name: string;
  lastMessage: string;
};

type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type UserCredentialsParams = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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

type MessageEventPayload = {
  message: Message;
  conversation: Conversation;
};

type CreateMessageParams = {
  id: number;
  content: string;
};

type CreateConversationParams = {
  email: string;
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
  email: string;
};
