import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiMicrophone, BiMicrophoneOff, BiVideo, BiVideoOff } from 'react-icons/bi';
import { ImPhoneHangUp } from 'react-icons/im';
import { RootState } from '../../store';
import {
  ConversationCallContainer,
  VideoContainer,
  VideoContainerActionButtons,
  VideoContainerItem
} from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';

const ConversationCall = () => {
  const socket = useSocketContext();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream, call, caller, receiver } = useSelector(
    (state: RootState) => state.call
  );
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

  const toggleMicrophone = () =>
    localStream &&
    setMicrophoneEnabled((prev) => {
      console.log('setting audio to ', prev);
      localStream.getAudioTracks()[0].enabled = !prev;
      return !prev;
    });

  const toggleVideo = () => {
    localStream &&
      setVideoEnabled((prev) => {
        localStream.getVideoTracks()[0].enabled = !prev;
        return !prev;
      });
  };

  const closeCall = () => {
    socket.emit('videoCallHangUp', { caller, receiver });
  };

  useEffect(() => {
    console.log('local stream was updated...');
    if (localVideoRef.current && localStream) {
      console.log('updating local video ref');
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.muted = true;
      localVideoRef.current.play();
    }
  }, [localStream]);
  useEffect(() => {
    console.log('remote stream was updated...');
    if (remoteVideoRef.current && remoteStream) {
      console.log('updating remote video ref');
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play();
    }
  }, [remoteStream]);

  return (
    <ConversationCallContainer>
      <VideoContainer>
        {localStream && (
          <VideoContainerItem>
            <video ref={localVideoRef} playsInline autoPlay />
          </VideoContainerItem>
        )}
        {remoteStream && (
          <VideoContainerItem>
            <video ref={remoteVideoRef} playsInline autoPlay />
          </VideoContainerItem>
        )}
      </VideoContainer>
      <VideoContainerActionButtons>
        <div>
          {videoEnabled ? <BiVideo onClick={toggleVideo} /> : <BiVideoOff onClick={toggleVideo} />}
        </div>
        <div>
          {microphoneEnabled ? (
            <BiMicrophone onClick={toggleMicrophone} />
          ) : (
            <BiMicrophoneOff onClick={toggleMicrophone} />
          )}
        </div>
        <div>
          <ImPhoneHangUp onClick={closeCall} />
        </div>
      </VideoContainerActionButtons>
    </ConversationCallContainer>
  );
};

export default ConversationCall;
