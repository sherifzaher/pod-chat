import { useSelector } from 'react-redux';
import { FriendsListContainer } from '../../utils/styles/friends';
import { RootState } from '../../store';
import FriendListItem from './friend-list-item';

function FriendsList() {
  const friends = useSelector((state: RootState) => state.friends.friends);
  return (
    <FriendsListContainer>
      {friends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
    </FriendsListContainer>
  );
}

export default FriendsList;
