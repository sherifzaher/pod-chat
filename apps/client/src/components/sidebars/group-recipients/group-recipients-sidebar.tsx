import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle
} from '../../../utils/styles';
import { AppDispatch, RootState } from '../../../store';
import { useSocketContext } from '../../../context/socket-context';
import {
  setContextMenuPoints,
  setSelectedUser,
  toggleContextMenu
} from '../../../store/slices/group-sidebar-slice';
import SelectedParticipantContextMenu from '../../context-menus/selected-participant-context-menu';
import { OnlineGroupRecipients } from './online-group-recipients';
import { OfflineGroupRecipients } from './offline-group-recipients';

export default function GroupRecipientsSidebar() {
  const { id: groupId } = useParams();
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(groupId!, 10)
  );
  const groupSidebarState = useSelector((state: RootState) => state.groupSidebar);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit('getOnlineGroupUsers', { groupId });
    const interval = setInterval(() => {
      console.log(`Pinging Group ${groupId}`);
      socket.emit('getOnlineGroupUsers', { groupId });
    }, 3000);
    socket.on('onlineGroupUsersReceived', (payload) => {
      console.log('received payload for online users');
      setOnlineUsers(payload.onlineUsers);
    });
    return () => {
      console.log('Clearing Interval for GroupRecipientsSidebar');
      clearInterval(interval);
      socket.off('onlineGroupUsersReceived');
    };
  }, [groupId, socket]);

  // useEffect to close the context menu if the window being resized
  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const onUserContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, user: User) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    const points: Points = {
      // 220px is the participant sidebar width, this line help me to position the context menu maximum at the edge of the page and does not overflow the user width
      x: window.innerWidth - (e.clientX + 220) <= 0 ? window.innerWidth - 220 : e.clientX,
      y: e.pageY
    };
    dispatch(setContextMenuPoints(points));
    dispatch(setSelectedUser(user));
  };

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [dispatch]);

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        <span>Online Users</span>
        <OnlineGroupRecipients
          users={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        <span>Offline Users</span>
        <OfflineGroupRecipients
          onlineUsers={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        {groupSidebarState.showUserContextMenu && (
          <SelectedParticipantContextMenu points={groupSidebarState.points} />
        )}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
}
