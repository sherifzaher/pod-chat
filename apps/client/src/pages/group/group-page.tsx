import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ConversationPanel from '../../components/conversations/conversation-panel';
import ConversationSidebar from '../../components/conversations/conversation-sidebar';

import { AppDispatch } from '../../store';
import { addGroup, fetchGroupThunk, updateGroup } from '../../store/slices/group-slice';
import { updateType } from '../../store/slices/selected-slice';
import { addGroupMessage } from '../../store/slices/group-message-slice';

import { useSocketContext } from '../../context/socket-context';
import { useAuthContext } from '../../context/auth-context';

function GroupPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const navigate = useNavigate();

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

    socket.on('onGroupReceivedUser', (payload: AddGroupUserMessagePayload) => {
      console.log('AddGroupUserMessagePayload');
      dispatch(updateGroup(payload.group));
    });

    socket.on('onGroupRemovedUser', (payload: RemoveGroupUserPayload) => {
      console.log('onGroupRemovedUser');
      console.log(payload);
      dispatch(updateGroup(payload.group));
      if (payload.user.id === user?.id) {
        console.log('user is logged in has been removed from the group.');
        console.log('navigating');
        navigate('/groups');
      }
    });

    return () => {
      socket.off('onGroupMessage');
      socket.off('onGroupCreate');
      socket.off('onGroupUserAdd');
      socket.off('AddGroupUserMessagePayload');
      socket.off('onGroupRemovedUser');
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
