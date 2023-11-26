import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CirclePlusFill, FaceVeryHappy } from 'akar-icons';
import { RiFileGifLine } from 'react-icons/ri';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

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
  const [caretStartPosition, setCaretStartPosition] = useState(0);
  const [caretEndPosition, setCaretEndPosition] = useState(0);

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
      const trimmedContent = content.trim();
      if (!routeId || !trimmedContent) return;
      const id = Number(routeId);

      if (conversationType === 'private') {
        try {
          await postNewMessage({ id, content: trimmedContent });
          setContent('');
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await postGroupMessage({ id, content: trimmedContent });
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
      }
      const target = e.target as HTMLTextAreaElement;
      setCaretStartPosition(target.selectionStart);
      setCaretEndPosition(target.selectionEnd);
    },
    [handleSendMessage, handleSendTypingStatus]
  );

  const handleOnEmojiSelect = (e: any) => {
    const emoji = e.native;
    if (caretStartPosition === 0) {
      const newContent = `${content.substring(9, caretStartPosition)} ${emoji} ${content.substring(
        caretEndPosition,
        content.length
      )}`;
      setContent(newContent);
    } else {
      const newContent = `${content.substring(
        0,
        caretStartPosition - 1
      )} ${emoji} ${content.substring(caretEndPosition - 1, content.length)}`;
      setContent(newContent);
    }
  };

  return (
    <MessageInputContainer>
      <CirclePlusFill className={styles.icon} size={ICON_SIZE} />
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
      <div className={styles.emojiPicker}>
        <Picker data={data} onEmojiSelect={handleOnEmojiSelect} />
      </div>
      {/* <RiFileGifLine className={styles.icon} size={ICON_SIZE} /> */}
      <FaceVeryHappy className={styles.icon} size={ICON_SIZE} />
      <div className={styles.characterCount}>{`${content.length}/${MAX_LENGTH}`}</div>
    </MessageInputContainer>
  );
}
