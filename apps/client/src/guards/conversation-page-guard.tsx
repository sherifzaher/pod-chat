import { Navigate, useLocation, useParams } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useConversationGuard } from '../hooks/useConversationGuard';

export default function ConversationPageGuard({ children }: PropsWithChildren) {
  const { id } = useParams();
  const location = useLocation();
  const { isLoading, error } = useConversationGuard(parseInt(id!, 10));

  if (isLoading) return <p>Loading...</p>;

  return error ? (
    <Navigate to="/conversations" replace state={{ from: location }} />
  ) : (
    <>{children}</>
  );
}
