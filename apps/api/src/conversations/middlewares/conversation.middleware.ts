import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../utils/types';
import { Services } from '../../utils/constants';
import { IConversationsService } from '../conversations';
import { InvalidConversationId } from '../exceptions/invalid-conversation-id';
import { ConversationNotFound } from '../exceptions/conversation-not-found';

@Injectable()
export class ConversationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
  ) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;

    const conversationId = parseInt(req.params.id);
    if (isNaN(conversationId)) throw new InvalidConversationId();

    const isReadable = await this.conversationService.hasAccess(
      conversationId,
      userId,
    );
    if (isReadable) return next();
    throw new ConversationNotFound();
  }
}
