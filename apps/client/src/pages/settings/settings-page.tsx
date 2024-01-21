import { Outlet } from 'react-router-dom';

import SettingsSidebar from '../../components/sidebars/settings/settings-sidebar';

export default function SettingsPage() {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
}
