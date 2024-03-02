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
import FriendsLayoutPage from './pages/friends/friends-layout-page';
import FriendRequestsPage from './pages/friends/friend-requests-page';
import OnBoardingPage from './pages/onboarding/on-boarding-page';
import SettingsPage from './pages/settings/settings-page';
import SettingsProfilePage from './pages/settings/settings-profile-page';
import { SettingsAppearancePage } from './pages/settings/settings-apperance-page';

enableMapSet();

function App() {
  return (
    <AppWithProviders>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
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
          <Route path="settings" element={<SettingsPage />}>
            <Route path="profile" element={<SettingsProfilePage />} index />
            <Route path="appearance" element={<SettingsAppearancePage />} />
          </Route>
          <Route path="friends" element={<FriendsLayoutPage />}>
            <Route path="requests" element={<FriendRequestsPage />} />
            <Route path="blocked" element={<div>Blocked</div>} />
          </Route>
        </Route>
      </Routes>
    </AppWithProviders>
  );
}

export default App;
