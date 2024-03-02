import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { store } from '../store';
import { AuthProvider } from '../context/auth-context';
import { SocketContext, socket } from '../context/socket-context';
import { DarkTheme, LightTheme } from '../utils/themes';

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
