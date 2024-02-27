import { FriendListItemContainer } from '../../utils/styles/friends';
import { UserAvatar } from '../messages/message-item-avatar';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  friend: Friend;
  online: boolean;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

function FriendListItem({ friend, onContextMenu, online }: Props) {
  const { user } = useAuth();
  const friendUserInstance = user?.id === friend.sender.id ? friend.receiver : friend.sender;

  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)} online={online}>
      <UserAvatar user={friendUserInstance} />
      <div className="friendDetails">
        <span className="username">{friendUserInstance.username}</span>
        {online && <span className="status">{friendUserInstance.presence?.statusMessage}</span>}
      </div>
    </FriendListItemContainer>
  );
}

export default FriendListItem;
