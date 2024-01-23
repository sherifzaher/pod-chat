import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IMessageAttachments } from './message-attachments';
import { Attachment } from '../utils/types';
import { MessageAttachment } from '../utils/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MessageAttachmentsService implements IMessageAttachments {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(MessageAttachment)
    private readonly messageAttachmentRepository: Repository<MessageAttachment>,
  ) {}
  async create(attachments: Attachment[]) {
    const Attachments: MessageAttachment[] = [];
    const allFiles = await this.cloudinaryService.uploadImages(attachments);
    allFiles.forEach((attachment) =>
      Attachments.push(
        this.messageAttachmentRepository.create({
          attachmentUrl: attachment.url,
        }),
      ),
    );
    await this.messageAttachmentRepository.save(Attachments);
    return Attachments;
  }
}
