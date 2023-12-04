import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FriendsList from '../../components/friends/friends-list';
import { AppDispatch } from '../../store';
import { fetchFriendsThunk, setFriendsOnlineStatus } from '../../store/slices/friends-slice';
import { useSocketContext } from '../../context/socket-context';

function FriendsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('getOnlineFriends');
    }, 10000);

    return () => {
      clearInterval(interval);
      socket.removeAllListeners();
    };
  }, [socket]);

  useEffect(() => {
    socket.on('onFriendListReceive', (payload: Friend[]) => {
      console.log('inside onFriendListReceive');
      // console.log(payload);
      dispatch(setFriendsOnlineStatus(payload));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, dispatch]);

  return (
    <div>
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
