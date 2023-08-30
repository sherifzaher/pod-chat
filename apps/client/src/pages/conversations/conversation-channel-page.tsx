import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSocketContext } from '../../context/socket-context';
import { fetchMessagesThunk, updateMessage } from '../../store/slices/messages-slice';
import { AppDispatch } from '../../store';

import MessagePanel from '../../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../../utils/styles';

function ConversationChannelPage() {
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    const conversationId = id!;
    socket.emit('onConversationJoin', { conversationId });

    socket.on('userJoin', () => {
      console.log('userJoin');
    });

    socket.on('userLeave', () => {
      console.log('userLeave');
    });

    socket.on('onTypingStart', () => {
      console.log('onTypingStart');
      setIsRecipientTyping(true);
    });

    socket.on('onTypingStop', () => {
      console.log('onTypingStop');
      setIsRecipientTyping(false);
    });

    socket.on('onMessageUpdate', (payload: Message) => {
      console.log('onMessageUpdate');
      dispatch(updateMessage(payload));
    });

    return () => {
      socket.emit('onConversationLeave', { conversationId });
      socket.off('userJoin');
      socket.off('userLeave');
      socket.off('onTypingStart');
      socket.off('onTypingStop');
      socket.off('onMessageUpdate');
    };
  }, [id, socket, dispatch]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel isRecipientTyping={isRecipientTyping} />
    </ConversationChannelPageStyle>
  );
}

export default ConversationChannelPage;
