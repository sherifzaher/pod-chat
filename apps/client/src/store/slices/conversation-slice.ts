import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getConversations, postNewConversation } from '../../utils/api';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () =>
  getConversations()
);

export const createConversationThunk = createAsyncThunk(
  'conversations/create',
  (data: CreateConversationParams) => postNewConversation(data)
);

export const ConversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const conversation = action.payload;
      const index = state.conversations.findIndex((c) => c.id === conversation.id);
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
        state.loading = false;
      })
      .addCase(createConversationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConversationThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { addConversation, updateConversation } = ConversationsSlice.actions;

export default ConversationsSlice.reducer;
