import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import { Inject } from '@nestjs/common';
import { Services } from '../utils/constants';
import { IGatewaySession } from './gateway.session';
import { Conversation, Group, GroupMessage, Message } from '../utils/typeorm';
import {
  AddGroupUserResponse,
  CreateGroupMessageResponse,
  CreateMessageResponse,
  DeleteMessageParams,
  RemoveGroupUserResponse,
} from '../utils/types';
import { IConversationsService } from '../conversations/conversations';
import { IGroupService } from '../groups/interfaces/group';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.1.6:3000'],
    credentials: true,
  },
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly sessions: IGatewaySession,
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
    @Inject(Services.GROUPS_SERVICE)
    private readonly groupsService: IGroupService,
  ) {}
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('New Incoming Connection');
    this.sessions.setUserSocket(socket.user.id, socket);
    socket.emit('connected', true);
  }
  handleDisconnect(socket: AuthenticatedSocket) {
    console.log('handleDisconnect');
    console.log(`${socket.user.email} disconnected.`);
    this.sessions.removeUserSocket(socket.user.id);
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getOnlineGroupUsers')
  async handleGetOnlineGroupUsers(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('handleGetOnlineGroupUsers');
    console.log(data);
    const group = await this.groupsService.findGroupById(
      parseInt(data.groupId),
    );
    if (!group) return;
    const onlineUsers = [];
    const offlineUsers = [];
    group.users.forEach((user) => {
      const socket = this.sessions.getSocketId(user.id);
      socket ? onlineUsers.push(user) : offlineUsers.push(user);
    });

    console.log(onlineUsers);
    console.log(offlineUsers);

    socket.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
  }

  @SubscribeMessage('onConversationJoin')
  onConversationJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onConversationJoin');
    client.join(`conversation-${data.conversationId}`);
    console.log(client.rooms);
    client.to(`conversation-${data.conversationId}`).emit('userJoin');
  }

  @SubscribeMessage('onConversationLeave')
  onConversationLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onConversationLeave');
    client.leave(`conversation-${data.conversationId}`);
    console.log(client.rooms);
    client.to(`conversation-${data.conversationId}`).emit('userLeave');
  }

  @SubscribeMessage('onGroupJoin')
  onGroupJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onGroupJoin');
    client.join(`group-${data.groupId}`);
    console.log(client.rooms);
    client.to(`group-${data.groupId}`).emit('userGroupJoin');
  }

  @SubscribeMessage('onGroupLeave')
  onGroupLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onGroupLeave');
    client.leave(`group-${data.groupId}`);
    console.log(client.rooms);
    client.to(`group-${data.groupId}`).emit('userGroupLeave');
  }

  @SubscribeMessage('onTypingStart')
  onTypingStart(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onTypingStart');
    console.log(data.conversationId);
    console.log(client.rooms);
    client.to(`conversation-${data.conversationId}`).emit('onTypingStart');
    // this.api.to(data.conversationId).emit('onTypingStart');
  }

  @SubscribeMessage('onTypingStop')
  onTypingStop(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onUserTyping');
    console.log(data.conversationId);
    console.log(client.rooms);
    client.to(`conversation-${data.conversationId}`).emit('onTypingStop');
    // this.api.to(data.conversationId).emit('onTypingStop');
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: CreateMessageResponse) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload.message;
    const authorSocket = this.sessions.getSocketId(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getSocketId(recipient.id)
        : this.sessions.getSocketId(creator.id);

    recipientSocket?.emit('onMessage', payload);
    authorSocket?.emit('onMessage', payload);
  }

  @OnEvent('conversation.create')
  handleCreateConversation(payload: Conversation) {
    const recipientSocket = this.sessions.getSocketId(payload.recipient.id);
    recipientSocket?.emit('onConversation', payload);
  }

  @OnEvent('message.delete')
  async handleDeleteMessage(payload: DeleteMessageParams) {
    const conversation = await this.conversationService.findConversationById(
      payload.conversationId,
    );
    if (!conversation) return;

    const { creator, recipient } = conversation;
    const otherSocket =
      creator.id === payload.userId
        ? this.sessions.getSocketId(recipient.id)
        : this.sessions.getSocketId(creator.id);
    otherSocket?.emit('onMessageDelete', payload);
  }

  @OnEvent('message.update')
  async handleMessageUpdate(message: Message) {
    console.log('inside message.create');
    const {
      author,
      conversation: { creator, recipient },
    } = message;

    const recipientSocket =
      creator.id === author.id
        ? this.sessions.getSocketId(recipient.id)
        : this.sessions.getSocketId(creator.id);
    recipientSocket?.emit('onMessageUpdate', message);
  }

  @OnEvent('group.message.create')
  async handleGroupMessageCreate(payload: CreateGroupMessageResponse) {
    const { id } = payload.group;
    console.log('Inside group.message.create');
    this.server.to(`group-${id}`).emit('onGroupMessage', payload);
  }

  @OnEvent('group.create')
  handleGroupCreate(payload: Group) {
    console.log('group.create.event');
    payload.users.forEach((user) => {
      const userSocket = this.sessions.getSocketId(user.id);
      userSocket && userSocket.emit('onGroupCreate', payload);
    });
  }

  @OnEvent('group.message.update')
  handleGroupMessageUpdate(payload: GroupMessage) {
    console.log('group.message.update Emitted');
    const room = `group-${payload.group.id}`;
    this.server.to(room).emit('onGroupMessageUpdate', payload);
  }

  @OnEvent('group.user.add')
  handleGroupUserAdd(payload: AddGroupUserResponse) {
    const userSocket = this.sessions.getSocketId(payload.user.id);
    this.server
      .to(`group-${payload.group.id}`)
      .emit('onGroupReceivedUser', payload);
    userSocket && userSocket.emit('onGroupUserAdd', payload);
  }

  @OnEvent('group.user.remove')
  handleGroupUserRemove(payload: RemoveGroupUserResponse) {
    const ROOM_NAME = `group-${payload.group.id}`;
    const removedUserSocket = this.sessions.getSocketId(payload.user.id);
    this.server.to(ROOM_NAME).emit('onGroupRemovedUser', payload);
    if (removedUserSocket) removedUserSocket.leave(ROOM_NAME);
    // const onlineUsers = payload.group.users
    //   .map((user) => this.sessions.getSocketId(user.id) && user)
    //   .filter((user) => user);
    // console.log(onlineUsers);
    // this.server.to(ROOM_NAME).emit('onlineGroupUsersReceived', { onlineUsers });
  }

  @OnEvent('group.owner.update')
  handleGroupOwnerUpdate(payload: Group) {
    console.log('Inside group.owner.update');
    const ROOM_NAME = `group-${payload.id}`;
    const newOwnerSocket = this.sessions.getSocketId(payload.owner.id);
    const { rooms } = this.server.sockets.adapter;
    const socketsInRoom = rooms.get(ROOM_NAME);
    this.server.to(ROOM_NAME).emit('onGroupOwnerUpdate', payload);
    if (newOwnerSocket && !socketsInRoom.has(newOwnerSocket.id)) {
      newOwnerSocket.emit('onGroupOwnerUpdate', payload);
    }
  }

  @OnEvent('group.user.leave')
  handleGroupUserLeave(payload) {
    console.log('Inside group.user.leave');
    const ROOM_NAME = `group-${payload.group.id}`;
    this.server.to(ROOM_NAME).emit('onGroupParticipantLeft', payload);
  }
}
