import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createGroupAPI,
  fetchGroups as FetchGroupsAPI,
  leaveGroup as leaveGroupAPI,
  postNewConversation,
  removeGroupRecipient as removeGroupRecipientAPI,
  updateGroupOwner
} from '../../utils/api';

export interface GroupState {
  groups: Group[];
  selectedGroup?: Group;
  showContextMenu: boolean;
  points: Points;
}

const initialState: GroupState = {
  groups: [],
  showContextMenu: false,
  points: { x: 0, y: 0 }
};

export const fetchGroupThunk = createAsyncThunk('group/fetch', () => FetchGroupsAPI());

export const createGroupThunk = createAsyncThunk('group/create', (data: CreateGroupParams) =>
  createGroupAPI(data)
);

export const removeGroupRecipientThunk = createAsyncThunk(
  'groups/recipients/delete',
  (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params)
);

export const updateGroupOwnerThunk = createAsyncThunk(
  'groups/owner/update',
  (params: UpdateGroupOwnerParams) => updateGroupOwner(params)
);

export const leaveGroupThunk = createAsyncThunk('groups/leave', (id: number) => leaveGroupAPI(id));

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
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      const existingGroup = state.groups.findIndex((group) => group.id === action.payload.id);
      if (existingGroup > -1) {
        state.groups.splice(existingGroup, 1);
      }
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroup = action.payload;
    },
    setContextMenuPoints: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
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
      })
      .addCase(updateGroupOwnerThunk.fulfilled, () => {
        console.log('updateGroupOwnerThunk.fulfilled');
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log('leaveGroupThunk.fulfilled');
      });
  }
});

export const {
  addGroup,
  updateGroup,
  removeGroup,
  setSelectedGroup,
  toggleContextMenu,
  setContextMenuPoints
} = GroupSlice.actions;
export default GroupSlice.reducer;
