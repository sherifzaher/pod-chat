import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FriendsListContainer } from '../../utils/styles/friends';
import { RootState } from '../../store';
import FriendListItem from './friend-list-item';

function FriendsList() {
  const { onlineFriends, offlineFriends } = useSelector((state: RootState) => state.friends);

  return (
    <FriendsListContainer>
      {onlineFriends.length > 0 && (
        <div>
          <span>Online ({onlineFriends.length})</span>
        </div>
      )}
      {onlineFriends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}

      {offlineFriends.length > 0 && (
        <div>
          <span>Online ({offlineFriends.length})</span>
        </div>
      )}
      {offlineFriends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
    </FriendsListContainer>
  );
}

export default FriendsList;
