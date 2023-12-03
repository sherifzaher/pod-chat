import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI,
  createFriendRequest as createFriendRequestAPI,
  cancelFriendRequest as cancelFriendRequestAPI
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
export const createFriendRequestThunk = createAsyncThunk(
  'friends/requests/create',
  (email: string) => createFriendRequestAPI(email)
);
export const cancelFriendRequestThunk = createAsyncThunk('friends/requests/cancel', (id: number) =>
  cancelFriendRequestAPI(id)
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests = [...state.friendRequests, action.payload];
    }
  },
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
      .addCase(createFriendRequestThunk.fulfilled, (state, action) => {
        console.log('createFriendRequestThunk.fulfilled');
        state.friendRequests = [...state.friendRequests, action.payload.data];
      })
      .addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
        state.friendRequests = [
          ...state.friendRequests.filter((req) => req.id !== action.payload.data.id)
        ];
      })
});

export const { addFriendRequest } = friendsSlice.actions;
export default friendsSlice.reducer;
