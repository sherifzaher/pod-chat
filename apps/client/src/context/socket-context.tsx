import { io } from 'socket.io-client';
import { createContext, useContext } from 'react';

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  withCredentials: true
});

export const SocketContext = createContext(socket);

export const useSocketContext = () => {
  const socketEmitter = useContext(SocketContext);
  if (!socketEmitter) {
    throw new Error('Please use useSocketContext inside SocketProvider');
  }

  return socketEmitter;
};
