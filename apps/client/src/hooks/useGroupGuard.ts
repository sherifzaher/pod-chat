import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { fetchGroupById } from '../utils/api';

export function useGroupGuard(id: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetchGroupById(id)
      .catch((axiosError: AxiosError) => {
        setError(axiosError);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [id]);

  return { isLoading, error };
}
