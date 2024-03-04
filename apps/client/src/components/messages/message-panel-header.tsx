import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { PeopleGroup, PersonAdd } from 'akar-icons';
import { BsFillCameraVideoFill } from 'react-icons/bs';

import { GroupHeaderIcons, MessagePanelHeaderStyle } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import AddGroupRecipientModal from '../modals/add-group-recipient-modal';
import { toggleSidebar } from '../../store/slices/group-sidebar-slice';
import { getRecipientFromConversation, getUserMediaStream } from '../../utils/helpers';
import {
  setActiveConversationId,
  setCaller,
  setIsCalling,
  setLocalStream,
  setReceiver
} from '../../store/slices/call-slice';
import { useAuth } from '../../hooks/useAuth';
import { useSocketContext } from '../../context/socket-context';

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type);
  const conversation = useSelector((state: RootState) => state.conversations.conversations).find(
    (conv) => conv.id.toString() === id!
  );
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id.toString() === id!
  );

  const getDisplayName = useCallback(
    () =>
      user?.id === conversation?.creator.id
        ? `${conversation?.recipient?.firstName} ${conversation?.recipient?.lastName}`
        : `${conversation?.creator?.firstName} ${conversation?.creator?.lastName}`,
    [
      conversation?.creator?.firstName,
      conversation?.creator.id,
      conversation?.creator?.lastName,
      conversation?.recipient?.firstName,
      conversation?.recipient?.lastName,
      user?.id
    ]
  );

  const headerTitle = useCallback(
    () => (selectedType === 'group' ? group?.title || 'Group' : getDisplayName()),
    [getDisplayName, group?.title, selectedType]
  );

  const callUser = async () => {
    const recipient = getRecipientFromConversation(conversation!, user!);
    if (!user) return console.log('User undefined');
    if (!recipient) return console.log('Recipient undefined');
    socket.emit('onVideoCallInitiate', {
      conversationId: conversation?.id,
      recipientId: recipient.id
    });

    const stream = await getUserMediaStream({ video: true, audio: true });
    dispatch(setLocalStream(stream));
    dispatch(setIsCalling(true));
    dispatch(setActiveConversationId(conversation!.id));
    dispatch(setCaller(user));
    dispatch(setReceiver(recipient));
  };

  return (
    <>
      {showModal && (
        <AddGroupRecipientModal showModal={showModal} setShowModal={() => setShowModal(false)} />
      )}
      <MessagePanelHeaderStyle>
        <div>
          <span>{headerTitle()}</span>
        </div>
        <GroupHeaderIcons>
          {selectedType === 'private' && (
            <BsFillCameraVideoFill size={30} cursor="pointer" onClick={callUser} />
          )}
          {selectedType === 'group' && user?.id === group?.owner?.id && (
            <PersonAdd cursor="pointer" onClick={() => setShowModal(true)} size={30} />
          )}
          {selectedType === 'group' && (
            <PeopleGroup cursor="pointer" size={30} onClick={() => dispatch(toggleSidebar())} />
          )}
        </GroupHeaderIcons>
      </MessagePanelHeaderStyle>
    </>
  );
}
