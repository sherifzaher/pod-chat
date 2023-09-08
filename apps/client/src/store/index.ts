import { configureStore } from '@reduxjs/toolkit';
import ConversationReducer from './slices/conversation-slice';
import MessagesReducer from './slices/messages-slice';
import SelectedReducer from './slices/selected-slice';
import GroupsReducer from './slices/group-slice';
import GroupMessages from './slices/group-message-slice';
import MessageContainer from './slices/message-container-slice';
import GroupSidebar from './slices/group-sidebar-slice';

export const store = configureStore({
  reducer: {
    conversations: ConversationReducer,
    messages: MessagesReducer,
    selectedConversationType: SelectedReducer,
    groups: GroupsReducer,
    groupMessages: GroupMessages,
    messageContainer: MessageContainer,
    groupSidebar: GroupSidebar
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
