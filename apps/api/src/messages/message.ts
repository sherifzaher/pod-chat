import { Message } from '../utils/typeorm';
import {
  CreateMessageParams,
  DeleteMessageParams,
  EditMessageParams,
} from '../utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams);
  //: Promise<CreateMessageResponse>
  getMessagesByConversationId(
    conversationId: number,
    skip: number,
  ): Promise<[Message[], number]>;
  deleteMessage(params: DeleteMessageParams);
  editMessage(params: EditMessageParams): Promise<Message>;
}
