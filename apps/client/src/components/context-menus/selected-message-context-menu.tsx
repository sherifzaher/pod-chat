import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ContextMenuStyles } from '../../utils/styles';

import { AppDispatch, RootState } from '../../store';
import { deleteMessageThunk } from '../../store/slices/messages-slice';
import {
  setIsEditingMessage,
  setMessageBeingEditing
} from '../../store/slices/message-container-slice';

import { useAuthContext } from '../../context/auth-context';
import { deleteGroupMessageThunk } from '../../store/slices/group-message-slice';

type Props = {
  points: { x: number; y: number };
};
export default function SelectedMessageContextMenu({ points }: Props) {
  const message = useSelector((state: RootState) => state.messageContainer.selectedMessage);
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);

  const { id } = useParams();
  const { user } = useAuthContext();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteMessage = async () => {
    if (!message || !id) return;
    const channelId = Number(id!);
    console.log(`Deleting Message ${message?.id}`);

    if (conversationType === 'private') {
      return dispatch(deleteMessageThunk({ conversationId: channelId, messageId: message.id }));
    }
    return dispatch(deleteGroupMessageThunk({ groupId: channelId, messageId: message.id }));
  };

  const editMessage = () => {
    if (!message) return;
    dispatch(setIsEditingMessage(true));
    dispatch(setMessageBeingEditing(message));
  };

  return (
    <ContextMenuStyles top={points.y} left={points.x}>
      <ul>
        {message?.author.id === user?.id && <li onClick={handleDeleteMessage}>Delete</li>}
        {message?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
      </ul>
    </ContextMenuStyles>
  );
}
