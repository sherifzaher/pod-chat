import styled, { css } from 'styled-components';
import {
  ContextMenuProps,
  ConversationSelectedProps,
  ConversationSidebarItemProps,
  InputContainerProps,
  MessageItemContentProps,
  MessageTypingStatusProps,
  PageProps,
  SidebarItemProps
} from '../../types/style-types';
import { fadeInUpwards, slideRightToLeft } from './keyframes';
import { Theme } from '../themes';

export const SIDEBAR_WIDTH = 400;

export const InputField = styled.input`
  box-sizing: border-box;
  font-family: 'Inter';
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  margin: 4px 0;
  width: 100%;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(props) => props.backgroundColor || '#131313'};
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const RecipientChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 5px;
  gap: 4px 10px;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const InputContainerHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputError = styled.span`
  color: #ff0000;
  text-transform: capitalize;
  font-size: 12px;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: white;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 25px;
  font-weight: 500;
  transition: 250ms border-color ease-in, 300ms border-color ease-in;
  border: 2px solid #2b09ff;

  &:focus {
    background-color: #4f34ff;
    border-color: #fff;
  }

  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }

  &:disabled {
    background-color: #4d4d4d;
    border-color: transparent;
    cursor: not-allowed;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ConversationSidebarContainer = styled.div``;

export const ConversationSidebarItemStyle = styled.div<ConversationSidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 32px;
  width: 100%;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected && theme.conversationSidebar.conversationItem.selected};
  transition: 200ms background-color ease-in-out;
  &:hover {
    background-color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.hover.backgroundColor};
  }
`;

export const ConversationSidebarItemDetails = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  & .conversationName {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.conversationSidebar.conversationItem.title.color};
  }
  & .conversationLastMessage {
    font-size: 15px;
    font-weight: 500;
    color: #868686;
    color: ${({ theme }) => theme.conversationSidebar.conversationItem.title.lastMessageColor};
  }
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000e3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

type ModalProps = Partial<{
  showModal: boolean;
}>;

export const ModalContainerStyle = styled.header<ModalProps>`
  position: relative;
  background-color: #121212;
  width: 650px;
  border-radius: 10px;
  animation: ${fadeInUpwards} 450ms ease;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  & h2 {
    font-weight: 400;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 20px;
`;

export const TextField = styled.textarea`
  border-sizing: border-box;
  font-family: 'Inter';
  width: 100%;
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessagePanelStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #5454543d;
  overflow: hidden;
  background-color: ${({ theme }) => theme.messagePanel.backgroundColor};
`;

export const MessagePanelBody = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0 24px 0;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #0e0e0e;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #161616;
    width: 5px;
    border-radius: 5px;
  }
`;

export const MessageInputContainer = styled.div`
  border-radius: 10px;
  background-color: #101010;
  width: 100%;
  padding: 16px 32px;
  display: flex;
  gap: 20px;
  background-color: ${({ theme }) => theme.messagePanel.inputContainer.backgroundColor};
  position: relative;
  & form {
    width: 100%;
  }
`;

export const MessagePanelFooter = styled.footer`
  padding: 0 32px 10px 32px;
`;

export const MessageInput = styled.textarea`
  background-color: inherit;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin: 4px 0;
  color: #454545;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  word-break: break-all;
`;

export const UserAvatarContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid gray;
`;

export const MessageItemDetails = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const MessageItemHeaderContainer = styled.div`
  display: flex;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  }
  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${(props) => props.padding};
  width: 100%;
  white-space: pre-line;
  color: ${({ theme }) => theme.messagePanel.body.content.color};
`;

export const MessagePanelHeaderStyle = styled.header`
  background-color: #141414;
  border-bottom: 1px solid #49494954;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.messagePanel.header.title};
`;

export const ContextMenu = styled.ul<ContextMenuProps>`
  border-radius: 8px;
  position: fixed;
  width: 220px;
  background-color: #0e0e0e;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  right: 0;
  list-style-type: none;
  margin: 0;
  padding: 10px;
  z-index: 50;
`;

export const ContextMenuItem = styled.li`
  padding: 14px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  margin: 6px 0;
  &:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;

export const MessageTypingStatus = styled.div<MessageTypingStatusProps>`
  width: 100%;
  margin: 10px 0 10px 0;
  font-size: 14px;
  color: #a2a2a2;
  transition: all 0.5s ease-in-out;
  visibility: ${(props) => (props.isRecipientTyping ? 'visible' : 'hidden')};
`;

export const EditMessageInputField = styled.input`
  outline: none;
  border: none;
  background-color: #222;
  color: #fff;
  border-radius: 5px;
  font-family: 'Inter';
  font-size: 15px;
  padding: 18px 22px;
  margin: 4px 0;
  width: 100%;

  &:disabled {
    background-color: #2d2d2d;
    color: gray;
    cursor: progress;
  }
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;
  & span {
    color: dodgerblue;
  }
`;

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  background-color: #141414;
  border-bottom: 1px solid #0f0f0f;
  padding: 20px 32px;
`;

export const ConversationSelectedItem = styled.div<ConversationSelectedProps>`
  padding: 10px 24px;
  border-radius: 10px;
  background-color: #212121;
  font-size: 14px;
  color: #f0f0f0;
  ${(props) =>
    props.selected &&
    css`
      background-color: #444444;
    `}
`;

export const UserAvatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 55px;
  margin: 10px 0;
  object-fit: contain;
  border: 1px solid gray;
`;

export const UserSidebarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;
`;

export const UserSidebarTopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  gap: 40px;
`;

export const UserSidebarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConversationSidebarStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 90px;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #111111;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* width: 10px;
    height: 5px; */
  }
`;
export const ConversationSidebarHeaderStyle = styled.header`
  padding: 24px 32px;
  box-sizing: border-box;
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: 0;
  left: 90px;
  z-index: 9;
  background-color: inherit;
`;

export const ConversationTabStyle = styled.section`
  display: flex;
  gap: 20px;
  margin: 14px 18px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ selected }) => (!selected ? '#1f1f1f' : '#383838')};
  padding: 8px 18px;
  border-radius: 5px;
  text-transform: uppercase;
`;

export const SidebarContainerStyle = styled.div``;

export const SidebarContainerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 32px;
  margin: 18px 0;
`;

export const SidebarContainerItemContent = styled.div`
  & .name {
    display: block;
    font-size: 18px;
    font-weight: 600;
  }

  & .lastMessage {
    display: block;
    font-size: 16px;
    color: #797979;
    font-weight: 500;
  }
`;

export const RecipientResultContainerStyle = styled.div`
  position: absolute;
  background-color: #161616;
  left: 0;
  right: 0;
  margin: 4px 24px;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 190px;
  overflow: scroll;
  &&::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientBottomSection = styled.div`
  border-top: 1px solid #fff;
  margin: 4px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const RecipientResultItem = styled.div`
  padding: 20px 28px;
  transition: 200ms background-color ease;
  &:hover {
    cursor: pointer;
    background-color: #0c0c0c;
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  border: 1px solid #323232b0;
  font-size: 14px;
  width: fit-content;
  border-radius: 50px;
  padding: 6px 18px;
  & .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  & .icon {
    margin-left: 10px;
    cursor: pointer;
    transition: 300ms color ease;
    :hover {
      color: #c62d2d;
    }
  }
`;

export const LayoutPage = styled.div`
  height: 100%;
  display: flex;
`;

export const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.userSidebar.backgroundColor};
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background-color: ${({ theme }: { theme: Theme }) => theme.conversationSidebar.backgroundColor};
  flex: 0 0 auto;
`;

export const ConversationSidebarHeader = styled.div`
  padding: 10px 30px;
  height: 90px;
  flex-shrink: 0;
  border-bottom: 1px solid #49494954;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ConversationScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSearchbar = styled.input`
  background-color: #1c1c1c;
  color: #e1e1e1;
  width: 100%;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 15px;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  border-radius: 5px;
`;

export const UserSidebarItemStyle = styled.div<SidebarItemProps>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background-color: ${({ active }) => active && '#1e1e1e'};
  cursor: pointer;
`;

export const IconBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  background-color: #ff3535;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GroupRecipientsSidebarStyle = styled.aside`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background-color: #121212;
  border-left: 1px solid #49494954;
  animation: ${slideRightToLeft} 300ms ease;
`;

export const GroupRecipientsSidebarHeader = styled.div`
  height: 90px;
  padding: 10px 32px;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494954;
  display: flex;
  align-items: center;
  gap: 20px;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const GroupRecipientSidebarItemContainer = styled.div`
  padding: 30px 0 0 30px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type GroupRecipientSidebarItemProps = {
  online: boolean;
};

export const GroupRecipientSidebarItem = styled.div<GroupRecipientSidebarItemProps>`
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  & .recipientDetails {
    display: flex;
    flex-direction: column;
  }
  & .left {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
  & .status {
    font-size: 12px;
    font-weight: 500;
    color: #929292;
  }
  opacity: ${({ online }) => !online && 0.2};
`;

export const GroupHeaderIcons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const TestContextMenu = styled.div<ContextMenuProps>`
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}

  width: 200px;
  background-color: #000;
`;

export const MessageAttachmentContainerStyle = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 0 0 auto;
  gap: 20px;
`;

export const MessageAttachmentStyle = styled.div`
  box-sizing: border-box;
  padding: 50px 0 0 0;
  position: relative;
  max-height: 200px;
  height: 200px;
  width: 200px;
  max-width: 200px;
  background-color: #161616;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

export const SystemMessageContainer = styled.div`
  width: 80%;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #1c1c1c;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  & .header {
    display: flex;
    align-items: center;
    gap: 10px;
    & .icon {
      font-size: 20px;
    }
    & span {
      font-weight: bold;
    }
  }
  & .content {
    font-size: 14px;
    font-style: italic;
    padding-left: 28px;
    color: #656565;
  }
`;
