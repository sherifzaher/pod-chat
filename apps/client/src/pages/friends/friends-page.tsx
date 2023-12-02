import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FriendsList from '../../components/friends/friends-list';
import { AppDispatch } from '../../store';
import { fetchFriendsThunk } from '../../store/slices/friends-slice';

function FriendsPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);
  return (
    <div>
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
