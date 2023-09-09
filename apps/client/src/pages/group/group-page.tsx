import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ConversationPanel from '../../components/conversations/conversation-panel';
import ConversationSidebar from '../../components/conversations/conversation-sidebar';

import { AppDispatch } from '../../store';
import { addGroup, fetchGroupThunk } from '../../store/slices/group-slice';
import { updateType } from '../../store/slices/selected-slice';
import { addGroupMessage } from '../../store/slices/group-message-slice';

import { useSocketContext } from '../../context/socket-context';

function GroupPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
      console.log('Group Message Received');
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    socket.on('onGroupCreate', (payload: Group) => {
      dispatch(addGroup(payload));
      console.log('Group Created');
      console.log(payload);
    });

    socket.on('onGroupUserAdd', (payload: AddGroupUserMessagePayload) => {
      console.log('onGroupUserAdd');
      console.log(payload);
      dispatch(addGroup(payload.group));
    });

    return () => {
      socket.off('onGroupMessage');
      socket.off('onGroupCreate');
      socket.off('onGroupUserAdd');
    };
  }, [dispatch, id, socket]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
}

export default GroupPage;
