import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Services } from '../utils/constants';
import { Conversation, Message, MessageAttachment } from '../utils/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MessageAttachmentsModule } from '../message-attachments/message-attachments.module';

@Module({
  imports: [
    MessageAttachmentsModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([Message, Conversation, MessageAttachment]),
  ],
  controllers: [MessagesController],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessagesService,
    },
  ],
})
export class MessagesModule {}
