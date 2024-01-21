import { useLocation, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

import { SettingsSidebarItemStyle } from '../../../utils/styles/settings';

type TSettingsSidebarItem = {
  item: UserSettingsItemType & { icon: IconType };
};

export default function SettingsSidebarItem({ item }: TSettingsSidebarItem) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  return (
    <SettingsSidebarItemStyle
      isActive={item.pathname === pathname}
      onClick={() => navigate(item.pathname)}>
      <div className="settingItem">
        <item.icon strokeWidth={STROKE_WIDTH} size={ICON_SIZE} />
        <span className="settingItem_label">{item.label}</span>
      </div>
    </SettingsSidebarItemStyle>
  );
}
