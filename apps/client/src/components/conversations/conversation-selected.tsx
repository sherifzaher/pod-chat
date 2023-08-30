import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ConversationSelectedItem, ConversationSelectedStyle } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import { updateType } from '../../store/slices/selected-slice';

const chatTypes = [
  {
    type: 'private',
    label: 'Private'
  },
  {
    type: 'group',
    label: 'Group'
  }
];

export default function ConversationSelected() {
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSelectType = (chatType: ConversationSelectedType) => {
    dispatch(updateType(chatType));
    navigate('/groups');
    if (chatType === 'group') navigate('/groups');
    else navigate('/conversations');
  };

  return (
    <ConversationSelectedStyle>
      {chatTypes.map((chat) => (
        <ConversationSelectedItem
          selected={selectedType === chat.type}
          key={chat.type}
          onClick={() => onSelectType(chat.type as ConversationSelectedType)}>
          {chat.label}
        </ConversationSelectedItem>
      ))}
    </ConversationSelectedStyle>
  );
}
