import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI
} from '../../utils/api';

interface FriendsState {
  friends: Friend[];
  friendRequests: FriendRequest[];
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: []
};

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => fetchFriendsAPI());
export const fetchFriendRequestsThunk = createAsyncThunk('friends/requests', () =>
  fetchFriendRequestsAPI()
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        console.log('fetchFriendsThunk.fulfilled');
        state.friends = action.payload.data;
      })
      .addCase(fetchFriendRequestsThunk.fulfilled, (state, action) => {
        console.log('fetchFriendRequestsThunk.fulfilled');
        state.friendRequests = action.payload.data;
      })
});

// export const {} = friendsSlice.actions;
export default friendsSlice.reducer;
