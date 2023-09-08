import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { PersonAdd } from 'akar-icons';
import { MessagePanelHeaderStyle } from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';
import AddGroupRecipientModal from '../modals/add-group-recipient-modal';

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

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
        {selectedType === 'group' && user?.id === group?.creator?.id && (
          <PersonAdd onClick={() => setShowModal(true)} size={30} />
        )}
      </MessagePanelHeaderStyle>
    </>
  );
}
