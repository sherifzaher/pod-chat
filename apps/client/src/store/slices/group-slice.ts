import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createGroupAPI,
  fetchGroups as FetchGroupsAPI,
  postNewConversation,
  removeGroupRecipient as removeGroupRecipientAPI
} from '../../utils/api';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: []
};

export const fetchGroupThunk = createAsyncThunk('group/fetch', () => FetchGroupsAPI());

export const createGroupThunk = createAsyncThunk('group/create', (data: CreateGroupParams) =>
  createGroupAPI(data)
);

export const removeGroupRecipientThunk = createAsyncThunk(
  'groups/recipients/delete',
  (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params)
);

export const GroupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to statesc`);
      state.groups.unshift(action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      const existingGroup = state.groups.findIndex((group) => group.id === updatedGroup.id);
      if (existingGroup > -1) {
        state.groups[existingGroup] = updatedGroup;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupThunk.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.groups = action.payload.data;
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const updatedGroup = action.payload.data;
        const existingGroup = state.groups.findIndex((group) => group.id === updatedGroup.id);
        if (existingGroup > -1) {
          state.groups[existingGroup] = updatedGroup;
        }
      });
  }
});

export const { addGroup, updateGroup } = GroupSlice.actions;
export default GroupSlice.reducer;
