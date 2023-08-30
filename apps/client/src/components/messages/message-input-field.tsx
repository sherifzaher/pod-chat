import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { postGroupMessage, postNewMessage } from '../../utils/api';
import { MessageInput, MessageInputContainer } from '../../utils/styles';

import { useSocketContext } from '../../context/socket-context';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function MessageInputField() {
  const [content, setContent] = useState('');
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);

  const { id: routeId } = useParams();

  const socket = useSocketContext();
  const { user } = useAuthContext();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!routeId || !content) return;
      const id = Number(routeId);

      if (conversationType === 'private') {
        try {
          await postNewMessage({ id, content });
          setContent('');
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await postGroupMessage({ id, content });
          setContent('');
        } catch (err) {
          console.log(err);
        }
      }
    },
    [routeId, content, conversationType]
  );

  const handleSendTypingStatus = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isChar = e.key.length === 1;
      if (!isChar) return;
      clearTimeout(timer);
      if (!typing) {
        console.log('user is typing');
        socket.emit('onTypingStart', {
          conversationId: routeId,
          sender: user?.id
        });
        setTyping(true);
      }
      setTimer(
        setTimeout(() => {
          console.log('user stopped typing');
          socket.emit('onTypingStop', {
            conversationId: routeId,
            sender: user?.id
          });
          setTyping(false);
        }, 500)
      );
    },
    [timer, typing, socket, routeId, user?.id]
  );

  return (
    <MessageInputContainer>
      <form onSubmit={handleSendMessage}>
        <MessageInput
          onKeyDown={handleSendTypingStatus}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </MessageInputContainer>
  );
}
