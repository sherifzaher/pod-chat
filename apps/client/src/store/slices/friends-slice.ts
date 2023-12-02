import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFriends as fetchFriendsAPI } from '../../utils/api';

interface FriendsState {
  friends: Friend[];
}

const initialState: FriendsState = {
  friends: []
};

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => fetchFriendsAPI());

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      console.log('fetchFriendsThunk.fulfilled');
      state.friends = action.payload.data;
    })
});

// export const {} = friendsSlice.actions;
export default friendsSlice.reducer;
