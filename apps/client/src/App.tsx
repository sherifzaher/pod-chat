import { Route, Routes } from 'react-router-dom';
import { enableMapSet } from 'immer';

import AppWithProviders from './components/app-with-providers';
import AuthenticatedRoutes from './components/authenticated-routes';

import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ConversationsPage from './pages/conversations/conversation-page';
import ConversationChannelPage from './pages/conversations/conversation-channel-page';
import GroupPage from './pages/group/group-page';
import GroupChannelPage from './pages/group/group-channel-page';
import AppPage from './pages/app-page';
import ConversationPageGuard from './guards/conversation-page-guard';
import GroupPageGuard from './guards/group-page-guard';
import FriendsPage from './pages/friends/friends-page';

enableMapSet();

function App() {
  return (
    <AppWithProviders>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <AuthenticatedRoutes>
              <AppPage />
            </AuthenticatedRoutes>
          }>
          <Route path="conversations" element={<ConversationsPage />}>
            <Route
              path=":id"
              element={
                <ConversationPageGuard>
                  <ConversationChannelPage />
                </ConversationPageGuard>
              }
            />
          </Route>
          <Route path="groups" element={<GroupPage />}>
            <Route
              path=":id"
              element={
                <GroupPageGuard>
                  <GroupChannelPage />
                </GroupPageGuard>
              }
            />
          </Route>
          <Route path="friends" element={<FriendsPage />}>
            <Route path="requests" element={<div>Requests</div>} />
            <Route path="blocked" element={<div>Blocked</div>} />
          </Route>
        </Route>
      </Routes>
    </AppWithProviders>
  );
}

export default App;
