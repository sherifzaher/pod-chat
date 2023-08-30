import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from '../context/auth-context';
import { SocketContext, socket } from '../context/socket-context';

export default function AppWithProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
      </AuthProvider>
    </ReduxProvider>
  );
}
