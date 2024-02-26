import styled, { css } from 'styled-components';
import { FriendRequestActionItemProps, FriendsNavbarItemProps } from '../../../types/style-types';

export const FriendsPageStyle = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding: 26px 60px;
  border-bottom: 1px solid #303030;
  & .navLinks {
    display: flex;
    align-items: center;
    gap: 80px;
  }
`;

export const FriendsNavbarItem = styled.span<FriendsNavbarItemProps>`
  cursor: pointer;
  transition: 1s text-decoration ease;
  ${({ active }) =>
    active &&
    css`
      text-decoration: underline;
      text-underline-offset: 12px;
    `}
`;

export const FriendsListContainer = styled.div`
  padding: 20px 60px;
  height: calc(100vh - 150px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #181818;
  & .avatar {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: #227eff;
  }
  &:last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestItemContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #1f1f1fbf;
  display: flex;
  justify-content: space-between;
  & .details {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  & .name {
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }

  & .status {
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    color: #626262;
  }

  & .icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestActionIcon = styled.div<FriendRequestActionItemProps>`
  background-color: #171717;
  border-radius: 50%;
  padding: 8px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #161616;
    color: ${({ isAccept = false }) => (isAccept ? '#00ff04' : '#ff3a3a')};
  }
`;
