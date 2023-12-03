import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IoMdPersonAdd } from 'react-icons/io';
import UserSidebar from '../components/sidebars/user-sidebar';
import { LayoutPage } from '../utils/styles';
import { useSocketContext } from '../context/socket-context';
import { AppDispatch } from '../store';
import {
  acceptFriendRequest,
  addFriendRequest,
  cancelFriendRequest
} from '../store/slices/friends-slice';
import { useToast } from '../hooks/useToast';

export default function AppPage() {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast({ theme: 'dark' });

  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('inside onFriendRequestReceived');
      toast.info(`${payload.sender.firstName} sent you a friend request`, {
        position: 'bottom-left',
        icon: IoMdPersonAdd,
        onClick: () => navigate('/friends/requests')
      });
      dispatch(addFriendRequest(payload));
    });

    socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
      console.log('inside onFriendRequestCancelled');
      dispatch(cancelFriendRequest(payload));
    });

    socket.on('onFriendRequestAccepted', (payload: AcceptFriendRequestResponse) => {
      console.log('inside onFriendRequestAccepted');
      toast.info(`${payload.friendRequest.sender.firstName} accepted your friend request`);
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
