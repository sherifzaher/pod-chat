import { Outlet } from 'react-router-dom';

import UserSidebar from '../components/sidebars/user-sidebar';
import { LayoutPage } from '../utils/styles';

export default function AppPage() {
  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
}
