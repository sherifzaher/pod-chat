import { PropsWithChildren } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import { useGroupGuard } from '../hooks/useGroupGuard';

export default function GroupPageGuard({ children }: PropsWithChildren) {
  const { id } = useParams();
  const location = useLocation();
  const { isLoading, error } = useGroupGuard(parseInt(id!, 10));

  if (isLoading) return <p>Loading...</p>;

  return error ? <Navigate to="/groups" replace state={{ from: location }} /> : <>{children}</>;
}
