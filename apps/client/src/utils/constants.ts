import { PersonCross } from 'akar-icons';

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
    color: '#ff0000'
  },
  {
    label: 'Transfer Owner',
    action: 'transfer_owner',
    color: '#ffb800'
  }
];
