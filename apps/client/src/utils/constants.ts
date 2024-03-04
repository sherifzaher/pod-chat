import { ChatDots, Person, ArrowCycle, Gear, Phone } from 'akar-icons';
import { IconType } from 'react-icons';
import {
  IoIosLock,
  IoIosNotifications,
  IoIosPerson,
  IoMdColorPalette,
  IoMdInfinite
} from 'react-icons/io';

export const chatTypes: ConversationTypeData[] = [
  {
    type: 'private',
    label: 'Private'
  },
  {
    type: 'group',
    label: 'Group'
  }
];

export const userContextMenuItems: ContextMenuItemType[] = [
  {
    label: 'Kick User',
    action: 'kick',
    color: '#ff0000',
    ownerOnly: true
  },
  {
    label: 'Transfer Owner',
    action: 'transfer_owner',
    color: '#ffb800',
    ownerOnly: true
  },
  {
    label: 'Profile',
    action: 'profile',
    color: '#7c7c7c',
    ownerOnly: false
  }
];

export const FriendsNavbarItems = [
  {
    id: 'friends',
    label: 'Friends',
    pathname: '/friends'
  },
  {
    id: 'requests',
    label: 'Requests',
    pathname: '/friends/requests'
  },
  {
    id: 'blocked',
    label: 'Blocked',
    pathname: '/friends/blocked'
  }
];

export const UserSidebarItems = [
  {
    id: 'conversations',
    href: '/conversations',
    icon: ChatDots
  },
  {
    id: 'friends',
    href: '/friends',
    icon: Person
  },
  {
    id: 'connections',
    href: '/connections',
    icon: ArrowCycle
  },
  {
    id: 'settings',
    href: '/settings',
    icon: Gear
  },
  {
    id: 'calls',
    href: '/calls',
    icon: Phone
  }
];

export const userSettingsItems: (UserSettingsItemType & { icon: IconType })[] = [
  {
    id: 'profile',
    label: 'Profile',
    pathname: '/settings/profile',
    icon: IoIosPerson
  },
  {
    id: 'security',
    label: 'Security',
    pathname: '/settings/security',
    icon: IoIosLock
  },
  {
    id: 'notifications',
    label: 'Notifications',
    pathname: '/settings/notifications',
    icon: IoIosNotifications
  },
  {
    id: 'integrations',
    label: 'Integrations',
    pathname: '/settings/integrations',
    icon: IoMdInfinite
  },
  {
    id: 'appearance',
    label: 'Appearance',
    pathname: '/settings/appearance',
    icon: IoMdColorPalette
  }
];

export enum FileLimit {
  MEGABYTE = 1048576
}

export enum AttachmentCount {
  count = 5
}
