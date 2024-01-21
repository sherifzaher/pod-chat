import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  SettingsSidebarStyle
} from '../../../utils/styles/settings';
import { userSettingsItems } from '../../../utils/constants';
import SettingsSidebarItem from '../sidebar-items/settings-sidebar-item';

export default function SettingsSidebar() {
  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeader>
        <span className="title">Settings</span>
      </SettingsSidebarHeader>
      <SettingsSidebarItemContainer>
        {userSettingsItems.map((item) => (
          <SettingsSidebarItem key={item.pathname} item={item} />
        ))}
      </SettingsSidebarItemContainer>
    </SettingsSidebarStyle>
  );
}
