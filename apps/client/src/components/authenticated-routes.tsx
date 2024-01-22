import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

function AuthenticatedRoutes({ children }: Props) {
  const { loading: isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (user) {
    return <>{children}</>;
  }
  console.log(isLoading, user);
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default AuthenticatedRoutes;
