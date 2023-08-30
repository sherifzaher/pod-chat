import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const ProviderValues = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={ProviderValues}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const data = useContext(AuthContext);
  if (!data) {
    throw new Error('Please use useAuthHook inside AuthProvider');
  }
  return data;
};
