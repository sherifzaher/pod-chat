import React from 'react';
import { useSelector } from 'react-redux';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineTextsms, MdPersonRemove } from 'react-icons/md';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { RootState } from '../../store';

function FriendContextMenu() {
  const { points, selectedFriendContextMenu } = useSelector((state: RootState) => state.friends);

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem>
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
