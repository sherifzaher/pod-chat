import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFound extends HttpException {
  constructor() {
    super('Conversation not found', HttpStatus.BAD_REQUEST);
  }
}
