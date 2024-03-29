import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from '../utils/constants';
import { Conversation, Message } from '../utils/typeorm';
import { UsersModule } from '../users/users.module';
import { ConversationMiddleware } from './middlewares/conversation.middleware';
import { isAuthorized } from '../utils/helpers';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [
    UsersModule,
    FriendsModule,
    TypeOrmModule.forFeature([Conversation, Message]),
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
  exports: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(isAuthorized, ConversationMiddleware)
      .forRoutes('conversations/:id');
  }
}
