import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/auth-context';
import { getAuthUser } from '../utils/api';

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthUser()
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [setUser]);

  return { user, isLoading };
}
