import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { editGroupMessage, fetchGroupMessagesThunk } from '../../store/slices/group-message-slice';

import MessagePanel from '../../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';
import GroupRecipientsSidebar from '../../components/sidebars/group-recipients/group-recipients-sidebar';

function GroupChannelPage() {
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const showSidebar = useSelector((state: RootState) => state.groupSidebar.showSidebar);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchGroupMessagesThunk(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;
    socket.emit('onGroupJoin', { groupId: id });
    socket.on('onGroupMessageUpdate', (payload: GroupMessageType) => {
      console.log('onGroupMessageUpdate received');
      console.log(payload);
      dispatch(editGroupMessage(payload));
    });

    return () => {
      socket.emit('onGroupLeave', { groupId: id });
      socket.off('onGroupMessageUpdate');
    };
  }, [dispatch, id, socket]);

  return (
    <>
      <ConversationChannelPageStyle>
        <MessagePanel isRecipientTyping={isRecipientTyping} />
      </ConversationChannelPageStyle>
      {showSidebar && <GroupRecipientsSidebar />}
    </>
  );
}

export default GroupChannelPage;
