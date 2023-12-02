import styled, { css } from 'styled-components';
import { FriendsNavbarItemProps } from '../../../types/style-types';

export const FriendsPageStyle = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 80px;
  font-size: 20px;
  padding: 26px 60px;
  border-bottom: 1px solid #303030;
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
