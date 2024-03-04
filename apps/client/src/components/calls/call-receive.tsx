import React from 'react';
import { useSelector } from 'react-redux';
import { MdCall, MdCallEnd } from 'react-icons/md';
import { RootState } from '../../store';
import { CallReceiveDialogContainer } from '../../utils/styles';
import { UserAvatar } from '../messages/message-item-avatar';
import { useSocketContext } from '../../context/socket-context';
import { useAuth } from '../../hooks/useAuth';

const ICON_SIZE = 24;

export default function CallReceiveDialog() {
  const { caller } = useSelector((state: RootState) => state.call);
  const socket = useSocketContext();
  const { user } = useAuth();

  const handleCall = (type: HandleCallType) => {
    switch (type) {
      case 'accept':
        socket.emit('videoCallAccepted', { caller });
        return;
      case 'reject':
        return socket.emit('videoCallRejected', { caller });
      default:
        return;
    }
  };

  return (
    <CallReceiveDialogContainer>
      <UserAvatar user={caller!} />
      <div>
        <span>{caller!.username} wants to call you</span>
      </div>
      <div className="icons">
        <div className="accept" onClick={() => handleCall('accept')}>
          <MdCall size={ICON_SIZE} />
        </div>
        <div className="reject" onClick={() => handleCall('reject')}>
          <MdCallEnd size={ICON_SIZE} />
        </div>
      </div>
    </CallReceiveDialogContainer>
  );
}
