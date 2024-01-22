import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { fetchUserThunk } from '../store/slices/user-slice';

export function useAuth() {
  const { loading, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    !user && dispatch(fetchUserThunk());
  }, [dispatch, user]);

  return {
    user,
    loading
  };
}
