import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditMessageActionsContainer, EditMessageInputField } from '../../utils/styles';

import { AppDispatch, RootState } from '../../store';
import { editMessageThunk } from '../../store/slices/messages-slice';
import { setIsEditingMessage } from '../../store/slices/message-container-slice';
import { editGroupMessageThunk } from '../../store/slices/group-message-slice';

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditMessageContainer({ onEditMessageChange }: Props) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { messageBeingEdited } = useSelector((state: RootState) => state.messageContainer);
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);
  const { id } = useParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting edit');
    if (!messageBeingEdited) {
      console.log('MessageIsBeingEdited is undefined... Returning');
      return;
    }

    if (conversationType === 'private') {
      const params: EditMessagePayload = {
        conversationId: Number(id!),
        messageId: messageBeingEdited?.id!,
        content: messageBeingEdited?.content!
      };

      dispatch(editMessageThunk(params))
        .unwrap()
        .then(() => dispatch(setIsEditingMessage(false)))
        .catch((err) => {
          console.log(err);
          dispatch(setIsEditingMessage(false));
        });
    } else {
      const params: EditGroupMessagePayload = {
        groupId: Number(id!),
        messageId: messageBeingEdited?.id!,
        content: messageBeingEdited?.content!
      };

      dispatch(editGroupMessageThunk(params))
        .unwrap()
        .then(() => dispatch(setIsEditingMessage(false)))
        .catch((err) => {
          console.log(err);
          dispatch(setIsEditingMessage(false));
        });
    }
  };

  return (
    <div>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        <EditMessageInputField
          disabled={disabled}
          value={messageBeingEdited?.content}
          onChange={onEditMessageChange}
        />
      </form>
      <EditMessageActionsContainer>
        <div>
          escape to <span>cancel</span> - enter to <span>save</span>
        </div>
      </EditMessageActionsContainer>
    </div>
  );
}
