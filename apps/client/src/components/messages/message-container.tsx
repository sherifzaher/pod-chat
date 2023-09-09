import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemContent
} from '../../utils/styles';
import FormattedMessage from './formatted-messages';
import EditMessageContainer from './edit-message-container';
import SelectedMessageContextMenu from '../context-menus/selected-message-context-menu';

import { RootState } from '../../store';
import { selectConversationMessage } from '../../store/slices/messages-slice';
import { selectGroupMessage } from '../../store/slices/group-message-slice';
import {
  setIsEditingMessage,
  editMessageContent,
  resetMessageContainer,
  setSelectedMessage
} from '../../store/slices/message-container-slice';

import { useAuthContext } from '../../context/auth-context';

export default function MessageContainer() {
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const { isEditing, selectedMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const { user } = useAuthContext();
  const { id } = useParams();

  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, Number(id!))
  );
  const groupMessages = useSelector((state: RootState) => selectGroupMessage(state, Number(id!)));
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type);

  const onContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message | GroupMessageType) => {
      e.preventDefault();
      console.log('Hello from context menu');
      setPoints({ x: e.pageX, y: e.pageY });
      setShowMenu(true);
      dispatch(setSelectedMessage(message));
    },
    [dispatch]
  );

  const onEditMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!messageBeingEdited) return;
      dispatch(editMessageContent(e.target.value));
    },
    [dispatch, messageBeingEdited]
  );

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === 'Escape' && dispatch(setIsEditingMessage(false));
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, id]);

  // reset everything when component un-mounted
  useEffect(() => {
    return () => {
      console.log('unmount');
      dispatch(resetMessageContainer());
    };
  }, [dispatch, id]);

  const mapMessages = (
    message: Message | GroupMessageType,
    index: number,
    messages: Message[] | GroupMessageType[]
  ) => {
    const nextIndex = index + 1;
    const currentMessage = messages[index];
    const nextMessage = messages[nextIndex];
    if (messages.length === nextIndex || currentMessage.author.id !== nextMessage.author.id)
      return (
        <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, message)}
          key={message.id}
          user={user}
          message={message}
          onEditMessageChange={onEditMessageChange}
        />
      );
    if (currentMessage.author.id === nextMessage.author.id) {
      return (
        <MessageItemContainer key={message.id} onContextMenu={(e) => onContextMenu(e, message)}>
          {isEditing && message.id === messageBeingEdited?.id ? (
            <MessageItemContent padding="0 0 0 70px">
              <EditMessageContainer onEditMessageChange={onEditMessageChange} />
            </MessageItemContent>
          ) : (
            <MessageItemContent padding="0 0 0 70px">{message.content}</MessageItemContent>
          )}
        </MessageItemContainer>
      );
    }
  };
  const formatMessages = () => {
    if (selectedType === 'private') return conversationMessages?.messages.map(mapMessages);
    return groupMessages?.messages.map(mapMessages);
  };

  return (
    <MessageContainerStyle>
      {formatMessages()}
      {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  );
}
