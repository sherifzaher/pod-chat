import { useSelector } from 'react-redux';
import { FriendsListContainer } from '../../utils/styles/friends';
import { RootState } from '../../store';
import FriendListItem from './friend-list-item';
import FriendRequestListItem from './friend-requests-list-item';

function FriendsRequestsList() {
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests);
  return (
    <FriendsListContainer>
      {friendRequests.map((friendRequest) => (
        <FriendRequestListItem key={friendRequest.id} friendRequest={friendRequest} />
      ))}
    </FriendsListContainer>
  );
}

export default FriendsRequestsList;
