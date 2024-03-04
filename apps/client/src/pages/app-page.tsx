import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { ThemeProvider } from 'styled-components';
import Peer from 'peerjs';
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
import {
  setCall,
  setCaller,
  setConnection,
  setIsCallInProgress,
  setIsReceivingCall,
  setLocalStream,
  setPeer,
  setReceiver,
  setRemoteStream
} from '../store/slices/call-slice';
import { useAuth } from '../hooks/useAuth';
import CallReceiveDialog from '../components/calls/call-receive';
import { getUserMediaStream } from '../utils/helpers';
import { useVideoCallRejected } from '../hooks/sockets/use-video-call-rejected';
import { useVideoCallHangUp } from '../hooks/sockets/use-video-call-hang-up';

export default function AppPage() {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast({ theme: 'dark' });
  const storageTheme = localStorage.getItem('theme') as SelectableTheme;
  const { theme } = useSelector((state: RootState) => state.settings);
  const { peer, call, isReceivingCall, caller, connection, localStream } = useSelector(
    (state: RootState) => state.call
  );
  const { user } = useAuth();

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

    socket.on('onVideoCall', (data: OnVideoCallPayload) => {
      console.log('receiving video call....');
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
    });

    return () => {
      socket.off('onFriendRequestReceived');
      socket.off('onFriendRequestCancelled');
      socket.off('onFriendRequestAccepted');
      socket.off('onFriendRequestRejected');
      socket.off('onVideoCall');
    };
  }, [socket, dispatch, toast, navigate, isReceivingCall, user]);

  useEffect(() => {
    socket.on('onVideoCallAccept', (data: AcceptedVideoCallPayload) => {
      console.log('video call was accepted!');
      console.log(data);
      dispatch(setIsCallInProgress(true));
      dispatch(setIsReceivingCall(false));
      if (!peer) return console.log('No peer....');
      if (data.caller.id === user!.id) {
        console.log(peer.id);
        const newConnection = peer.connect(data.acceptor.peer?.id || data.acceptor.username);
        dispatch(setConnection(newConnection));
        if (localStream) {
          const newCall = peer.call(data.acceptor.peer?.id || data.acceptor.username, localStream);
          dispatch(setCall(newCall));
        }
      }
    });

    return () => {
      socket.off('onVideoCallAccept');
    };
  }, [peer, dispatch, socket, user, localStream]);

  useVideoCallRejected();
  useVideoCallHangUp();

  useEffect(() => {
    if (!peer) return;
    console.log('inside peer useEffect hook...');
    console.log(peer);
    peer.on('call', (incomingCall) => {
      console.log('Receiving Call');
      console.log(incomingCall);
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        })
        .then((stream) => {
          incomingCall.answer(stream);
          dispatch(setLocalStream(stream));
          console.log('answering call');
          dispatch(setCall(incomingCall));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [peer, call, dispatch]);

  useEffect(() => {
    console.log('an update was made to call, calling callback');
    if (!call) return;
    console.log('call exists!');
    call.on('stream', (remoteStream) => {
      console.log('received remotestream');
      console.log('dispatching setRemoteStream action...');
      dispatch(setRemoteStream(remoteStream));
    });
  }, [call, dispatch]);

  useEffect(() => {
    dispatch(fetchFriendRequestsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const newPeer = new Peer(user.peer?.id || user.username);
    dispatch(setPeer(newPeer));
  }, [user, dispatch]);

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
      {isReceivingCall && caller && <CallReceiveDialog />}
      <LayoutPage>
        <UserSidebar />
        <Outlet />
      </LayoutPage>
    </ThemeProvider>
  );
}
