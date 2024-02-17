import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { deleteMessageThunk } from '../../store/slices/messages-slice';
import { deleteGroupMessageThunk } from '../../store/slices/group-message-slice';
import { setIsEditing, setMessageBeingEdited } from '../../store/slices/message-container-slice';
import { useAuth } from '../../hooks/useAuth';

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const deleteMessage = () => {
    const id = parseInt(routeId!, 10);
    console.log(`Delete message ${message?.id}`);
    if (!message) return;
    const messageId = message.id;
    return conversationType === 'private'
      ? dispatch(deleteMessageThunk({ conversationId: id, messageId: message.id }))
      : dispatch(deleteGroupMessageThunk({ groupId: id, messageId }));
  };

  const editMessage = () => {
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={deleteMessage}>Delete</ContextMenuItem>
      )}
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={editMessage}>Edit</ContextMenuItem>
      )}
    </ContextMenu>
  );
};
