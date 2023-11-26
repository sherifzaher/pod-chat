export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  GROUPS = 'groups',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = '/groups/:id/recipients',
  FRIENDS = 'friends',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGES_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  GROUPS_SERVICE = 'GROUPS_SERVICE',
  GROUP_MESSAGES = 'GROUP_MESSAGES',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENT_SERVICE',
  FRIENDS = 'FRIENDS_SERVICE',
}
