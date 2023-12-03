import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UserSidebar from '../components/sidebars/user-sidebar';
import { LayoutPage } from '../utils/styles';
import { useSocketContext } from '../context/socket-context';
import { AppDispatch } from '../store';
import {
  acceptFriendRequest,
  addFriendRequest,
  cancelFriendRequest
} from '../store/slices/friends-slice';

export default function AppPage() {
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('inside onFriendRequestReceived');
      dispatch(addFriendRequest(payload));
    });

    socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
      console.log('inside onFriendRequestCancelled');
      dispatch(cancelFriendRequest(payload));
    });

    socket.on('onFriendRequestAccepted', (payload: AcceptFriendRequestResponse) => {
      console.log('inside onFriendRequestAccepted');
      dispatch(acceptFriendRequest(payload));
    });

    socket.on('onFriendRequestRejected', (payload: FriendRequest) => {
      console.log('inside onFriendRequestRejected');
      dispatch(cancelFriendRequest(payload));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, dispatch]);

  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
}
