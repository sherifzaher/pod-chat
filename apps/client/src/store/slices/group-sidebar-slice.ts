import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GroupSidebarState {
  showSidebar: boolean;
  showUserContextMenu: boolean;
  selectedUser?: User;
  points: Points;
}

const initialState: GroupSidebarState = {
  showSidebar: true,
  showUserContextMenu: false,
  points: { x: 0, y: 0 }
};
export const groupSidebarSlice = createSlice({
  name: 'groupSidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserContextMenu = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setContextMenuPoints: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    }
  }
});

export const { toggleSidebar, toggleContextMenu, setSelectedUser, setContextMenuPoints } =
  groupSidebarSlice.actions;
export default groupSidebarSlice.reducer;
