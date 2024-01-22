import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ConversationPanel from '../../components/conversations/conversation-panel';
import ConversationSidebar from '../../components/sidebars/conversation-sidebar';

import { AppDispatch, RootState } from '../../store';
import {
  addGroup,
  fetchGroupThunk,
  removeGroup,
  updateGroup
} from '../../store/slices/group-slice';
import { updateType } from '../../store/slices/selected-slice';
import { addGroupMessage } from '../../store/slices/group-message-slice';

import { useSocketContext } from '../../context/socket-context';

function GroupPage() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
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

    socket.on('onGroupRemovedUser', ({ group, user: groupUser }: RemoveGroupUserPayload) => {
      console.log('onGroupRemovedUser');
      console.log(group);
      dispatch(updateGroup(group));
      if (user?.id === groupUser?.id) {
        console.log('user is logged in has been removed from the group.');
        console.log('navigating');
        navigate('/groups');
        toast.warning(`${group.creator.firstName} removed you from ${group.title || 'the group'}`);
        dispatch(removeGroup(group));
      }
    });

    socket.on('onGroupOwnerUpdate', (payload: Group) => {
      if (payload?.title && payload.owner.id === user?.id) {
        toast.success(`You're the owner of ${payload.title} group.`);
      }
      dispatch(updateGroup(payload));
    });

    socket.on('onGroupParticipantLeft', (payload) => {
      console.log('inside onGroupParticipantLeft');
      console.log(payload);
      dispatch(updateGroup(payload.group));
      if (payload.userId === user?.id) {
        navigate('/groups');
        dispatch(removeGroup(payload.group));
      }
    });

    return () => {
      socket.off('onGroupMessage');
      socket.off('onGroupCreate');
      socket.off('onGroupUserAdd');
      socket.off('onGroupReceivedUser');
      socket.off('onGroupRemovedUser');
      socket.off('onGroupParticipantLeft');
      socket.off('onGroupOwnerUpdate');
    };
  }, [dispatch, id, navigate, socket, user?.id]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
}

export default GroupPage;
