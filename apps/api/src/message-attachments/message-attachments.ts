import { Attachment } from '../utils/types';
import { GroupMessageAttachment, MessageAttachment } from '../utils/typeorm';

export interface IMessageAttachments {
  create(attachments: Attachment[]): Promise<MessageAttachment[]>;
  createGroupAttachments(
    attachments: Attachment[],
  ): Promise<GroupMessageAttachment[]>;
  deleteAllAttachments(attachments: MessageAttachment[]);
}
