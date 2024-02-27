import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FriendsListContainer } from '../../utils/styles/friends';
import { AppDispatch, RootState } from '../../store';
import FriendListItem from './friend-list-item';
import FriendContextMenu from '../context-menus/friend-context-menu';
import {
  setContextMenuPoints,
  setSelectedFriend,
  toggleContextMenu
} from '../../store/slices/friends-slice';

function FriendsList() {
  const { onlineFriends, offlineFriends, showFriendsContextMenu } = useSelector(
    (state: RootState) => state.friends
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [dispatch]);

  const onContextMenu = (event: ContextMenuEvent, friend: Friend) => {
    event.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuPoints({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedFriend(friend));
  };

  return (
    <FriendsListContainer>
      {onlineFriends.length > 0 && (
        <div>
          <span>Online ({onlineFriends.length})</span>
        </div>
      )}
      {onlineFriends.map((friend) => (
        <FriendListItem key={friend.id} onContextMenu={onContextMenu} friend={friend} online />
      ))}

      {offlineFriends.length > 0 && (
        <div>
          <span>offline ({offlineFriends.length})</span>
        </div>
      )}
      {offlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          onContextMenu={onContextMenu}
          friend={friend}
          online={false}
        />
      ))}
      {showFriendsContextMenu && <FriendContextMenu />}
    </FriendsListContainer>
  );
}

export default FriendsList;
