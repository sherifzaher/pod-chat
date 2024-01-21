import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import SettingsSidebar from '../../components/sidebars/settings/settings-sidebar';

export default function SettingsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/settings/profile');
  }, [navigate]);

  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
}
