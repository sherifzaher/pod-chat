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
