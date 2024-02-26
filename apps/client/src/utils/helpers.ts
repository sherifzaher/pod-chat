import { Crown, Minus, PersonCross } from 'akar-icons';

export const getRecipientFromConversation = (conversation: Conversation, user: User): User =>
  user.id === conversation?.creator?.id ? conversation.recipient : conversation.creator;

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
  switch (type) {
    case 'kick':
      return { icon: PersonCross, color: '#ff0000' };
    case 'transfer_owner':
      return { icon: Crown, color: '#ffb800' };
    default:
      return { icon: Minus, color: '#fff' };
  }
};

export const isGroupOwner = (user: User, group: Group) => user?.id === group?.owner?.id;

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User
): FriendRequestDetailsType =>
  user?.id === receiver.id
    ? {
        status: 'Incoming Friend Request',
        displayName: `${sender.firstName} ${sender.lastName}`,
        user: sender,
        incoming: true
      }
    : {
        status: 'Outgoing Friend Request',
        displayName: `${receiver.firstName} ${receiver.lastName}`,
        user: receiver,
        incoming: false
      };
