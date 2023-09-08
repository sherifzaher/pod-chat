import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { PeopleGroup, PersonAdd } from 'akar-icons';
import { GroupHeaderIcons, MessagePanelHeaderStyle } from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { AppDispatch, RootState } from '../../store';
import AddGroupRecipientModal from '../modals/add-group-recipient-modal';
import { toggleSidebar } from '../../store/slices/group-sidebar-slice';

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
          {selectedType === 'group' && user?.id === group?.creator?.id && (
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
