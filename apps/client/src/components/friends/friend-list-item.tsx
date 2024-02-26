import { FriendListItemContainer } from '../../utils/styles/friends';
import { UserAvatar } from '../messages/message-item-avatar';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  friend: Friend;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

function FriendListItem({ friend, onContextMenu }: Props) {
  const { user } = useAuth();
  const friendUserInstance = user?.id === friend.sender.id ? friend.receiver : friend.sender;

  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)}>
      <UserAvatar user={friendUserInstance} />
      <div>{friendUserInstance.username}</div>
    </FriendListItemContainer>
  );
}

export default FriendListItem;
