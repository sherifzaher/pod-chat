import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Services } from '../utils/constants';
import { MessageAttachmentsService } from './message-attachments.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { GroupMessageAttachment, MessageAttachment } from '../utils/typeorm';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([MessageAttachment, GroupMessageAttachment]),
  ],
  controllers: [],
  providers: [
    {
      provide: Services.MESSAGES_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
  exports: [
    {
      provide: Services.MESSAGES_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
})
export class MessageAttachmentsModule {}
