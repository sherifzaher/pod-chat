import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI,
  createFriendRequest as createFriendRequestAPI,
  cancelFriendRequest as cancelFriendRequestAPI,
  rejectFriendRequest as rejectFriendRequestAPI,
  acceptFriendRequest as acceptFriendRequestAPI
} from '../../utils/api';

interface FriendsState {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onlineFriends: Friend[];
  offlineFriends: Friend[];
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: [],
  onlineFriends: [],
  offlineFriends: []
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
export const rejectFriendRequestThunk = createAsyncThunk('friends/requests/reject', (id: number) =>
  rejectFriendRequestAPI(id)
);
export const acceptFriendRequestThunk = createAsyncThunk('friends/requests/accept', (id: number) =>
  acceptFriendRequestAPI(id)
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests = [...state.friendRequests, action.payload];
    },
    cancelFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests = state.friendRequests.filter((req) => req.id !== action.payload.id);
    },
    acceptFriendRequest: (state, action: PayloadAction<AcceptFriendRequestResponse>) => {
      state.friendRequests = state.friendRequests.filter(
        (req) => req.id !== action.payload.friendRequest.id
      );
      state.friends = [...state.friends, action.payload.friend];
    },
    setFriendsOnlineStatus: (state, action: PayloadAction<Friend[]>) => {
      state.onlineFriends = action.payload;
      state.offlineFriends = state.friends.filter(
        (friend) => !action.payload.find((onlineFriend) => onlineFriend.id === friend.id)
      );
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
        state.friendRequests = state.friendRequests.filter(
          (req) => req.id !== action.payload.data.id
        );
      })
      .addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
        console.log('inside acceptFriendRequestThunk.fulfilled');
        state.friendRequests = state.friendRequests.filter(
          (req) => req.id !== action.payload.data.friendRequest.id
        );
        state.friends = [...state.friends, action.payload.data.friend];
      })
      .addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
        console.log('inside rejectFriendRequestThunk.fulfilled');
        state.friendRequests = state.friendRequests.filter(
          (req) => req.id !== action.payload.data.id
        );
      })
});

export const {
  addFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  setFriendsOnlineStatus
} = friendsSlice.actions;
export default friendsSlice.reducer;
