import { useSelector } from 'react-redux';
import { FriendListItemContainer } from '../../utils/styles/friends';
import { RootState } from '../../store';

type Props = {
  friend: Friend;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

function FriendListItem({ friend, onContextMenu }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)}>
      <div className="avatar" />
      <div>{user?.id === friend.sender.id ? friend.receiver.username : friend.sender.username}</div>
    </FriendListItemContainer>
  );
}

export default FriendListItem;
