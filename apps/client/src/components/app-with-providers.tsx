import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { store } from '../store';
import { AuthProvider } from '../context/auth-context';
import { SocketContext, socket } from '../context/socket-context';

import 'react-toastify/dist/ReactToastify.css';

export default function AppWithProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
      </AuthProvider>
      <ToastContainer theme="dark" />
    </ReduxProvider>
  );
}
