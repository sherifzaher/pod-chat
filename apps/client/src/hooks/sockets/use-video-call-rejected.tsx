import { useContext, useEffect } from 'react';
import { useSocketContext } from '../../context/socket-context';

export function useVideoCallRejected() {
  const socket = useSocketContext();

  useEffect(() => {
    socket.on('onVideoCallRejected', (data) => {
      console.log('receiver rejected the call ', data.receiver);
    });

    return () => {
      console.log('removing onVideoCallRejected listener');
      socket.off('onVideoCallRejected');
    };
  }, [socket]);
}
