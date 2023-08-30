import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SelectedTypeState = {
  type: 'group' | 'private';
};

const initialState: SelectedTypeState = {
  type: 'private'
};

export const SelectedTypeSlice = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<ConversationSelectedType>) => {
      state.type = action.payload;
    }
  }
});

export const { updateType } = SelectedTypeSlice.actions;

export default SelectedTypeSlice.reducer;
