import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { ThemeProvider } from 'styled-components';
import UserSidebar from '../components/sidebars/user-sidebar';
import { LayoutPage } from '../utils/styles';
import { useSocketContext } from '../context/socket-context';
import { AppDispatch, RootState } from '../store';
import {
  acceptFriendRequest,
  addFriendRequest,
  cancelFriendRequest,
  fetchFriendRequestsThunk
} from '../store/slices/friends-slice';
import { useToast } from '../hooks/useToast';
import { DarkTheme, LightTheme, SelectableTheme } from '../utils/themes';

export default function AppPage() {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast({ theme: 'dark' });
  const storageTheme = localStorage.getItem('theme') as SelectableTheme;
  const { theme } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('inside onFriendRequestReceived');
      dispatch(addFriendRequest(payload));
      toast.info(`${payload.sender.firstName} sent you a friend request`, {
        position: 'bottom-left',
        icon: IoMdPersonAdd,
        onClick: () => navigate('/friends/requests')
      });
    });

    socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
      console.log('inside onFriendRequestCancelled');
      dispatch(cancelFriendRequest(payload));
    });

    socket.on('onFriendRequestAccepted', (payload: AcceptFriendRequestResponse) => {
      console.log('inside onFriendRequestAccepted');
      dispatch(acceptFriendRequest(payload));
      socket.emit('getOnlineFriends');
      toast.info(`${payload.friendRequest.receiver.firstName} accepted your friend request`, {
        position: 'bottom-left',
        icon: BsFillPersonCheckFill,
        onClick: () => navigate('/friends')
      });
    });

    socket.on('onFriendRequestRejected', (payload: FriendRequest) => {
      console.log('inside onFriendRequestRejected');
      dispatch(cancelFriendRequest(payload));
    });

    return () => {
      socket.off('onFriendRequestReceived');
      socket.off('onFriendRequestCancelled');
      socket.off('onFriendRequestAccepted');
      socket.off('onFriendRequestRejected');
    };
  }, [socket, dispatch, toast, navigate]);

  useEffect(() => {
    dispatch(fetchFriendRequestsThunk());
  }, [dispatch]);

  return (
    <ThemeProvider
      theme={
        // eslint-disable-next-line no-nested-ternary
        storageTheme
          ? storageTheme === 'dark'
            ? DarkTheme
            : LightTheme
          : theme === 'dark'
          ? DarkTheme
          : LightTheme
      }>
      <LayoutPage>
        <UserSidebar />
        <Outlet />
      </LayoutPage>
    </ThemeProvider>
  );
}
