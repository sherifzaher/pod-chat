import { Conversation, User } from '../utils/typeorm';
import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ): Promise<Conversation>;
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation>;
  hasAccess(conversationId: number, userId: number): Promise<boolean>;
  isCreated(userId: number, recipientId: number): Promise<Conversation | undefined>;
}
