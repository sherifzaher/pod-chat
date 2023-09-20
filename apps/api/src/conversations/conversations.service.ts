import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConversationsService } from './conversations';
import { Conversation, User } from '../utils/typeorm';
import { Services } from '../utils/constants';
import { CreateConversationParams } from '../utils/types';
import { IUserService } from '../users/user';
import { ConversationNotFound } from './exceptions/conversation-not-found';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('conversation.creator', 'creator')
      .leftJoinAndSelect('conversation.recipient', 'recipient')
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('conversation.lastMessageSentAt', 'DESC')
      .getMany();
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne(id, {
      relations: ['lastMessageSent', 'creator', 'recipient'],
    });
  }

  async createConversation(user: User, params: CreateConversationParams) {
    const { email } = params;

    const recipient = await this.userService.findUser({ email });
    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    if (user.id === recipient.id)
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );

    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: user.id },
          recipient: { id: recipient.id },
        },
        {
          creator: { id: recipient.id },
          recipient: { id: user.id },
        },
      ],
    });

    if (existingConversation)
      throw new HttpException('Conversation exists', HttpStatus.CONFLICT);

    const conversation = this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });

    return this.conversationRepository.save(conversation);
  }

  async hasAccess(conversationId: number, userId: number) {
    const conversation = await this.conversationRepository.findOne(
      conversationId,
      {
        relations: ['creator', 'recipient'],
      },
    );
    if (!conversation) throw new ConversationNotFound();

    return (
      conversation.creator.id === userId || conversation.recipient.id === userId
    );
  }
}
