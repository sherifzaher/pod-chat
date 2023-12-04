import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteMessage as deleteMessageApi,
  getConversationMessages,
  editMessage as editMessageAPI,
  postNewMessage as postNewMessageAPI
} from '../../utils/api';
import { RootState } from '../index';

export interface MessagesState {
  messages: FetchMessagePayload[];
  loading: boolean;
  pagination: {
    skip: number;
  };
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  pagination: {
    skip: 0
  }
};

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetch',
  ({ id, skip }: FetchMessagesProps) => getConversationMessages(id, skip)
);

export const deleteMessageThunk = createAsyncThunk(
  'messages/delete',
  (params: DeleteMessageParams) => deleteMessageApi(params)
);

export const editMessageThunk = createAsyncThunk('messages/edit', (params: EditMessagePayload) =>
  editMessageAPI(params)
);

export const createMessageThunk = createAsyncThunk(
  'messages/create',
  async (params: CreateMessageParams, thunkAPI) => {
    try {
      const response = await postNewMessageAPI(params);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload;
      const conversationItem = state.messages.find((conv) => conv.id === conversation.id);
      conversationItem?.messages.unshift(message);
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { conversationId, messageId } = action.payload;
      const conversationMessages = state.messages.find((cm) => cm.id === conversationId);

      const messageIndex = conversationMessages?.messages.findIndex((m) => m.id === messageId)!;
      if (messageIndex > -1) {
        conversationMessages?.messages.splice(messageIndex, 1);
      }
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const {
        id: messageId,
        conversation: { id: conversationId }
      } = action.payload;

      const conversationMessage = state.messages.find((conv) => conv.id === conversationId);
      if (!conversationMessage) return;

      const messageIndex = conversationMessage.messages.findIndex((msg) => msg.id === messageId);
      if (messageIndex < 0) return;

      conversationMessage.messages[messageIndex] = action.payload;
    },
    updatePaginationSkip: (state, action: PayloadAction<number>) => {
      state.pagination.skip = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.messages.findIndex((msg) => msg.id === id);
        if (index > -1) {
          if (state.pagination.skip === 0) {
            state.messages[index] = action.payload.data;
          } else {
            state.messages[index].messages = [...state.messages[index].messages, ...messages];
          }
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const conversationMessages = state.messages.find((cm) => cm.id === data.conversationId);

        const messageIndex = conversationMessages?.messages.findIndex(
          (m) => m.id === data.messageId
        )!;
        if (messageIndex > -1) {
          conversationMessages?.messages.splice(messageIndex, 1);
        }
      })
      .addCase(editMessageThunk.fulfilled, (state, action) => {
        console.log('editMessageThunk.fulfilled');
        console.log(action.payload.data);

        const { data: message } = action.payload;
        const { id: conversationId } = message.conversation;

        const conversationMessage = state.messages.find((cm) => cm.id === conversationId);
        if (!conversationMessage) return;

        const messageIndex = conversationMessage.messages.findIndex((msg) => msg.id === message.id);
        if (messageIndex < 0) return;

        conversationMessage.messages[messageIndex] = message;
      });
  }
});

const selectConversationMessages = (state: RootState) => state.messages.messages;
const selectConversationMessagesById = (state: RootState, id: number) => id;

export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessagesById],
  (messages, id) => messages.find((gm) => gm.id === id)
);

export const { addMessage, deleteMessage, updateMessage, updatePaginationSkip } =
  MessagesSlice.actions;
export default MessagesSlice.reducer;
