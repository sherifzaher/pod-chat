import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocketContext } from '../../context/socket-context';
import { resetState } from '../../store/slices/call-slice';
import { AppDispatch } from '../../store';

export function useVideoCallRejected() {
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on('onVideoCallRejected', (data) => {
      console.log('receiver rejected the call ', data.receiver);
      dispatch(resetState());
    });

    return () => {
      console.log('removing onVideoCallRejected listener');
      socket.off('onVideoCallRejected');
    };
  }, [socket]);
}
