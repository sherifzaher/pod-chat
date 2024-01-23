import { Attachment } from '../utils/types';
import { MessageAttachment } from '../utils/typeorm';

export interface IMessageAttachments {
  create(attachments: Attachment[]): Promise<MessageAttachment[]>;
}
