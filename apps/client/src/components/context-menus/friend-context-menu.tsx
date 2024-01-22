import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineTextsms, MdPersonRemove } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import { removeFriendThunk, toggleContextMenu } from '../../store/slices/friends-slice';
import { useSocketContext } from '../../context/socket-context';
import { checkConversationOrCreate } from '../../utils/api';

function FriendContextMenu() {
  const { points, selectedFriendContextMenu } = useSelector((state: RootState) => state.friends);
  const socket = useSocketContext();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getUserInstanceFromFriend = () =>
    user?.id === selectedFriendContextMenu?.sender.id
      ? selectedFriendContextMenu?.receiver
      : selectedFriendContextMenu?.sender;

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

  const handleSendMessage = () => {
    const recipientInstance = getUserInstanceFromFriend();
    if (!recipientInstance) return;
    checkConversationOrCreate(+recipientInstance.id)
      .then(({ data }) => {
        console.log(data);
        navigate(`/conversations/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={handleRemoveFriend}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: '#ff0000' }}>Remove Friend</span>
      </ContextMenuItem>
      <ContextMenuItem onClick={handleSendMessage}>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: '#fff' }}>Message</span>
      </ContextMenuItem>
    </ContextMenu>
  );
}

export default FriendContextMenu;
