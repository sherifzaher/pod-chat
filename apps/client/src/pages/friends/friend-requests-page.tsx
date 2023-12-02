import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchFriendRequestsThunk } from '../../store/slices/friends-slice';
import FriendsRequestsList from '../../components/friends/friend-requests-list';

function FriendRequestsPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendRequestsThunk());
  }, [dispatch]);
  return <FriendsRequestsList />;
}

export default FriendRequestsPage;
