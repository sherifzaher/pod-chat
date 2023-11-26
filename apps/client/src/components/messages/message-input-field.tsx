import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CirclePlusFill, FaceVeryHappy } from 'akar-icons';
import { RiFileGifLine } from 'react-icons/ri';

import { postGroupMessage, postNewMessage } from '../../utils/api';
import { MessageInputContainer } from '../../utils/styles';
import styles from '../forms/index.module.scss';

import { useSocketContext } from '../../context/socket-context';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';
import MessageTextField from '../inputs/message-text-field';

const ICON_SIZE = 32;
const MAX_LENGTH = 2048;

export default function MessageInputField() {
  const [content, setContent] = useState('');
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const { id: routeId } = useParams();
  const { user } = useAuthContext();
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);
  const recipient = useSelector((state: RootState) => state.conversations.conversations).find(
    (conv) => conv.id === parseInt(routeId!, 10)
  )?.recipient;
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(routeId!, 10)
  );

  const socket = useSocketContext();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLTextAreaElement>) => {
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
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      handleSendTypingStatus(e);
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSendMessage(e);
        setContent('');
      }
    },
    [handleSendTypingStatus]
  );

  return (
    <MessageInputContainer>
      <CirclePlusFill className={styles.icon} size={ICON_SIZE} />
      <form>
        {/* <MessageInput
          onKeyDown={handleSendTypingStatus}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Send a message to ${
            conversationType === 'group' ? group?.title || 'Group' : recipient?.firstName || 'user'
          }`}
        /> */}
        <MessageTextField
          onKeyDown={handleOnKeyDown}
          maxLength={MAX_LENGTH}
          setMessage={setContent}
          message={content}
          placeholder={`Send a message to ${
            conversationType === 'group' ? group?.title || 'Group' : recipient?.firstName || 'user'
          }`}
        />
      </form>
      {/* <RiFileGifLine className={styles.icon} size={ICON_SIZE} /> */}
      <FaceVeryHappy className={styles.icon} size={ICON_SIZE} />
      <div className={styles.characterCount}>{`${content.length}/${MAX_LENGTH}`}</div>
    </MessageInputContainer>
  );
}
