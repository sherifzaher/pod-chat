import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuthUser as getAuthUserAPI } from '../../utils/api';

export interface UserState {
  user?: User;
  loading: boolean;
}

const initialState: UserState = {
  loading: true
};

export const fetchUserThunk = createAsyncThunk('user/fetch', () => getAuthUserAPI());

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;
