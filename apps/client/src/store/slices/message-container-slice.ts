import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageContainerState {
  selectedMessage?: Message | GroupMessageType;
  messageBeingEdited?: Message | GroupMessageType;
  isEditing: boolean;
}

const initialState: MessageContainerState = {
  isEditing: false
};

export const MessageContainerSlice = createSlice({
  name: 'messageContainer',
  initialState,
  reducers: {
    setSelectedMessage: (state, action: PayloadAction<Message | GroupMessageType>) => {
      state.selectedMessage = action.payload;
    },
    setMessageBeingEditing: (
      state,
      action: PayloadAction<Message | GroupMessageType | undefined>
    ) => {
      state.messageBeingEdited = action.payload;
    },
    setIsEditingMessage: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    editMessageContent: (state, action: PayloadAction<string>) => {
      if (!state.messageBeingEdited) return;
      state.messageBeingEdited.content = action.payload;
    },
    resetMessageContainer: (state, action: PayloadAction<undefined>) => {
      state.selectedMessage = undefined;
      state.selectedMessage = undefined;
      state.isEditing = false;
    }
  }
});

export const {
  setSelectedMessage,
  resetMessageContainer,
  setMessageBeingEditing,
  setIsEditingMessage,
  editMessageContent
} = MessageContainerSlice.actions;
export default MessageContainerSlice.reducer;
