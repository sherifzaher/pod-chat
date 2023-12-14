import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Group } from './entities/Group';
import { Message } from './entities/Message';
import { GroupMessage } from './entities/GroupMessage';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { Profile } from './entities/Profile';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  FriendRequest,
  Friend,
  Profile,
];

export {
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  FriendRequest,
  Friend,
  Profile,
};

export default entities;
