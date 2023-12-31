import { ChatDots, Person, ArrowCycle } from 'akar-icons';

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
  }
];
