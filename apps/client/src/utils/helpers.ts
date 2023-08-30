export const getRecipientFromConversation = (conversation: Conversation, user: User): User =>
  user.id === conversation?.creator?.id ? conversation.recipient : conversation.creator;
