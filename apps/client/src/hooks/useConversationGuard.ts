import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getConversationById } from '../utils/api';

export function useConversationGuard(id: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    getConversationById(id)
      .catch((axiosError: AxiosError) => {
        setError(axiosError);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [id]);

  return { isLoading, error };
}
