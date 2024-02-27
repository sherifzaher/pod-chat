import { configureStore } from '@reduxjs/toolkit';
import ConversationReducer from './slices/conversation-slice';
import MessagesReducer from './slices/messages-slice';
import SelectedReducer from './slices/selected-slice';
import GroupsReducer from './slices/group-slice';
import GroupMessages from './slices/group-message-slice';
import MessageContainer from './slices/message-container-slice';
import GroupSidebar from './slices/group-sidebar-slice';
import FriendsReducer from './slices/friends-slice';
import rateLimitReducer from './slices/rate-limit-slice';
import userReducer from './slices/user-slice';
import messagePanelReducer from './slices/message-panel-slice';
import systemMessageReducer from './slices/system-message-slice';
import settingsReducer from './slices/settings-slice';

export const store = configureStore({
  reducer: {
    conversations: ConversationReducer,
    messages: MessagesReducer,
    selectedConversationType: SelectedReducer,
    groups: GroupsReducer,
    groupMessages: GroupMessages,
    messageContainer: MessageContainer,
    groupSidebar: GroupSidebar,
    friends: FriendsReducer,
    rateLimit: rateLimitReducer,
    user: userReducer,
    messagePanel: messagePanelReducer,
    systemMessages: systemMessageReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
