import { useAuthContext } from '../../context/auth-context';
import { FriendListItemContainer } from '../../utils/styles/friends';

type Props = {
  friend: Friend;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

function FriendListItem({ friend, onContextMenu }: Props) {
  const { user } = useAuthContext();
  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)}>
      <div className="avatar" />
      <div>{user?.id === friend.sender.id ? friend.receiver.email : friend.sender.email}</div>
    </FriendListItemContainer>
  );
}

export default FriendListItem;
