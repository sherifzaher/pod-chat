import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ConversationSidebar from '../../components/sidebars/conversation-sidebar';
import ConversationPanel from '../../components/conversations/conversation-panel';

import { AppDispatch } from '../../store';
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation
} from '../../store/slices/conversation-slice';
import { addMessage, deleteMessage } from '../../store/slices/messages-slice';
import { updateType } from '../../store/slices/selected-slice';

import { useSocketContext } from '../../context/socket-context';

function ConversationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const { id } = useParams();

  useEffect(() => {
    dispatch(updateType('private'));
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on('connected', () => console.log('connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation } = payload;
      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });

    socket.on('onConversation', (payload: Conversation) => {
      dispatch(addConversation(payload));
    });

    socket.on('onMessageDelete', (payload: DeleteMessageResponse) => {
      dispatch(deleteMessage(payload));
    });

    return () => {
      socket.off('connected');
      socket.off('onMessage');
      socket.off('onConversation');
      socket.off('onMessageDelete');
    };
  }, [socket, dispatch, id]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
}

export default ConversationsPage;
