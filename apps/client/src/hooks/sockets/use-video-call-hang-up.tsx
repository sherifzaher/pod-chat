import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocketContext } from '../../context/socket-context';
import { AppDispatch, RootState } from '../../store';
import { resetState } from '../../store/slices/call-slice';

export function useVideoCallHangUp() {
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();
  const { call, localStream, remoteStream } = useSelector((state: RootState) => state.call);
  useEffect(() => {
    socket.on('onVideoCallHangUp', () => {
      console.log('received onVideoCallHangUp');
      localStream && localStream.getTracks().forEach((track) => track.stop());
      remoteStream && remoteStream.getTracks().forEach((track) => track.stop());
      call && call.close();
      dispatch(resetState());
    });

    return () => {
      socket.off('onVideoCallHangUp');
    };
  }, [call]);
}
