type DisplayTypes = 'flex' | 'block' | 'grid' | 'hidden';
type JustifyContent =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'normal'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';
type AlignItems =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';

type PageProps = Partial<{
  display: DisplayTypes;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
}>;

type InputContainerProps = Partial<{
  backgroundColor: string;
}>;

type MessageItemContentProps = Partial<{
  padding: string;
}>;

export type ContextMenuProps = Partial<{
  top: number;
  left: number;
}>;

export type MessageTypingStatusProps = {
  isRecipientTyping: boolean;
};

export type ConversationSelectedProps = {
  selected: boolean;
};

export type SidebarItemProps = Partial<{
  active: boolean;
}>;

export type ConversationSidebarItemProps = {
  selected: boolean;
};

export type FriendsNavbarItemProps = {
  active: boolean;
};

export type FlexProps = Partial<{
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
}>;

export type FriendRequestActionItemProps = {
  isAccept?: boolean;
};

export type SettingsSidebarItemProps = {
  isActive: boolean;
};

export type UserBannerProps = Partial<{
  backgroundUrl: string;
}>;
