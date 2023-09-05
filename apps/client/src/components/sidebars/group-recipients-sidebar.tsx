import { PeopleGroup } from 'akar-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  GroupRecipientSidebarItem,
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle,
  MessageItemAvatar
} from '../../utils/styles';
import { RootState } from '../../store';
import { useSocketContext } from '../../context/socket-context';

export default function GroupRecipientsSidebar() {
  const { id: groupId } = useParams();
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(groupId!, 10)
  );
  const socket = useSocketContext();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit('getOnlineGroupUsers', { groupId });
    const interval = setInterval(() => {
      console.log(`Pinging Group ${groupId}`);
      socket.emit('getOnlineGroupUsers', { groupId });
    }, 10000);
    socket.on('onlineGroupUsersReceived', (payload) => {
      console.log('received payload for online users');
      console.log(payload);
      setOnlineUsers(payload.onlineUsers);
      setOfflineUsers(payload.offlineUsers);
    });
    return () => {
      console.log('Clearing Interval for GroupRecipientsSidebar');
      clearInterval(interval);
      socket.off('onlineGroupUsersReceived');
    };
  }, [groupId, socket]);

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
        <PeopleGroup />
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        <span>Online Users</span>
        {onlineUsers.map((user) => (
          <GroupRecipientSidebarItem key={user.id}>
            <MessageItemAvatar />
            <span>{user.firstName}</span>
          </GroupRecipientSidebarItem>
        ))}
        <span>Offline Users</span>
        {offlineUsers.map((user) => (
          <GroupRecipientSidebarItem key={user.id}>
            <MessageItemAvatar />
            <span>{user.firstName}</span>
          </GroupRecipientSidebarItem>
        ))}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
}
