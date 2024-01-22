import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAttachment {
  id: number;
  file: File;
}

interface IMessagePanelState {
  attachments: IAttachment[];
  attachmentCounter: number;
}

const initialState: IMessagePanelState = {
  attachments: [],
  attachmentCounter: 0
};

export const messagePanelSlice = createSlice({
  name: 'messagePanel',
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<IAttachment>) => {
      state.attachments.push(action.payload);
      state.attachmentCounter += 1;
    },
    removeAttachment: (state, action: PayloadAction<IAttachment>) => {
      state.attachments = state.attachments.filter((file) => file.id !== action.payload.id);
      state.attachmentCounter -= 1;
    }
  }
});

export const { addAttachment, removeAttachment } = messagePanelSlice.actions;
export default messagePanelSlice.reducer;
