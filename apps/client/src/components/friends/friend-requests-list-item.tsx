import { useAuthContext } from '../../context/auth-context';
import { FriendRequestItemContainer } from '../../utils/styles/friends';

type Props = {
  friendRequest: FriendRequest;
};

function FriendRequestListItem({ friendRequest }: Props) {
  const { user } = useAuthContext();
  return (
    <FriendRequestItemContainer>
      <div className="avatar" />
      <div>
        {user?.id === friendRequest.sender.id ? (
          <div>Outgoing request to {friendRequest.receiver.email}</div>
        ) : (
          <div>Incoming request from {friendRequest.sender.email}</div>
        )}
      </div>
    </FriendRequestItemContainer>
  );
}

export default FriendRequestListItem;
