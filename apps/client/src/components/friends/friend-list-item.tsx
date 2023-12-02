import { useAuthContext } from '../../context/auth-context';
import { FriendListItemContainer } from '../../utils/styles/friends';

type Props = {
  friend: Friend;
};

function FriendListItem({ friend }: Props) {
  const { user } = useAuthContext();
  return (
    <FriendListItemContainer>
      <div className="avatar" />
      <div>{user?.id === friend.sender.id ? friend.receiver.email : friend.sender.email}</div>
    </FriendListItemContainer>
  );
}

export default FriendListItem;
