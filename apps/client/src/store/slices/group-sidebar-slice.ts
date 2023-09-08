import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GroupSidebarState {
  showSidebar: boolean;
}

const initialState: GroupSidebarState = {
  showSidebar: true
};
export const groupSidebarSlice = createSlice({
  name: 'groupSidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    }
  }
});

export const { toggleSidebar } = groupSidebarSlice.actions;
export default groupSidebarSlice.reducer;
