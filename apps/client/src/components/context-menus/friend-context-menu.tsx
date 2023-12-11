import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineTextsms, MdPersonRemove } from 'react-icons/md';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import { removeFriendThunk, toggleContextMenu } from '../../store/slices/friends-slice';
import { useSocketContext } from '../../context/socket-context';

function FriendContextMenu() {
  const { points, selectedFriendContextMenu } = useSelector((state: RootState) => state.friends);
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFriend = () => {
    if (selectedFriendContextMenu) {
      dispatch(removeFriendThunk(selectedFriendContextMenu?.id))
        .unwrap()
        .then(() => {
          dispatch(toggleContextMenu(false));
          socket.emit('getOnlineFriends');
        });
    }
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={handleRemoveFriend}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: '#ff0000' }}>Remove Friend</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: '#fff' }}>Message</span>
      </ContextMenuItem>
    </ContextMenu>
  );
}

export default FriendContextMenu;
