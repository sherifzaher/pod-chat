import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectConversationMessage } from '../../store/slices/messages-slice';
import { selectGroupMessage } from '../../store/slices/group-message-slice';
import { AppDispatch, RootState } from '../../store';
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu
} from '../../store/slices/message-container-slice';
import { useHandleClick, useKeydown } from '../../hooks';
import {
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemDetails
} from '../../utils/styles';
import { MessageItemHeader } from './attachments/message-item-header';
import { MessageItemContainerBody } from './attachments/message-item-container-body';
import { SelectedMessageContextMenu } from '../context-menus/selected-message-context-menu';
import { MessageItemAvatar } from './message-item-avatar';

const MessageContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!, 10))
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!, 10))
  );
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type);
  const { showContextMenu } = useSelector((state: RootState) => state.messageContainer);
  const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleContextMenu(false));

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: Message | GroupMessageType
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: Message | GroupMessageType,
    index: number,
    messages: Message[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages.length === index + 1 || currentMessage.author.id !== nextMessage.author.id;
    return (
      <MessageItemContainer key={message.id} onContextMenu={(e) => onContextMenu(e, message)}>
        {showMessageHeader && <MessageItemAvatar message={message} />}
        {showMessageHeader ? (
          <MessageItemDetails>
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
            />
          </MessageItemDetails>
        ) : (
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="0 0 0 70px"
          />
        )}
      </MessageItemContainer>
    );
  };

  return (
    <MessageContainerStyle
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;
        if (-scrollTopMax === node.scrollTop) {
          console.log('');
        }
      }}>
      <>
        {selectedType === 'private'
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </>
      {showContextMenu && <SelectedMessageContextMenu />}
    </MessageContainerStyle>
  );
};

export default MessageContainer;
