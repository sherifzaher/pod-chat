import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { PersonAdd } from 'akar-icons';
import { MessagePanelHeaderStyle } from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useAuthContext();

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
    <MessagePanelHeaderStyle>
      <div>
        <span>{headerTitle()}</span>
      </div>
      {selectedType === 'group' && <PersonAdd size={30} />}
    </MessagePanelHeaderStyle>
  );
}
