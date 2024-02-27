import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePlusFill, FaceVeryHappy } from 'akar-icons';

import { AxiosError } from 'axios';
import { postGroupMessage, postNewMessage } from '../../utils/api';
import { MessageInputContainer } from '../../utils/styles';
import styles from '../forms/index.module.scss';

import { useSocketContext } from '../../context/socket-context';
import { AppDispatch, RootState } from '../../store';
import MessageTextField from '../inputs/message-text-field';
import { useToast } from '../../hooks/useToast';
import MessageAttachmentActionIcon from './message-attachment-action-icon';
import { resetAttachments } from '../../store/slices/message-panel-slice';
import { addSystemMessage } from '../../store/slices/system-message-slice';

const ICON_SIZE = 32;
const MAX_LENGTH = 2048;

export default function MessageInputField() {
  const toastId = 'rateLimitToast';
  const [content, setContent] = useState('');
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const { error } = useToast({ theme: 'dark' });
  const { id: routeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { messageCounter } = useSelector((state: RootState) => state.systemMessages);
  const { user } = useSelector((state: RootState) => state.user);
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);
  const recipient = useSelector((state: RootState) => state.conversations.conversations).find(
    (conv) => conv.id === parseInt(routeId!, 10)
  )?.recipient;
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(routeId!, 10)
  );

  const socket = useSocketContext();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const trimmedContent = content.trim();
      if (!routeId || (!trimmedContent && !attachments.length)) return;

      const formData = new FormData();
      formData.append('id', routeId);
      formData.append('content', trimmedContent);

      attachments.forEach((attachment) => formData.append('attachments', attachment.file));

      try {
        conversationType === 'private'
          ? await postNewMessage(routeId, formData)
          : await postGroupMessage(routeId, formData);
        setContent('');
        dispatch(resetAttachments());
      } catch (err) {
        if ((err as AxiosError).response?.status === 429) {
          error('You are rate limited', { toastId });
          dispatch(
            addSystemMessage({
              id: messageCounter,
              level: 'error',
              content: 'You are being rate limited. Slow down.'
            })
          );
        } else if ((err as AxiosError).response?.status === 404) {
          dispatch(
            addSystemMessage({
              id: messageCounter,
              level: 'error',
              content: 'The recipient is not in your friends list or they may have blocked you.'
            })
          );
        }
      }
    },
    [content, routeId, attachments, conversationType, dispatch, error, messageCounter]
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
      }
    },
    [handleSendMessage, handleSendTypingStatus]
  );

  return (
    <MessageInputContainer>
      <MessageAttachmentActionIcon />
      <form>
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
