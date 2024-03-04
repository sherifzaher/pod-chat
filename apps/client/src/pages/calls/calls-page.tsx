import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CallsSidebar from '../../components/sidebars/calls/calls-sidebar';
import { fetchFriendsThunk } from '../../store/slices/friends-slice';
import { AppDispatch } from '../../store';

const CallsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);
  return (
    <>
      <CallsSidebar />
      <Outlet />
    </>
  );
};

export default CallsPage;
