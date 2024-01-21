import styled from 'styled-components';
import { SettingsSidebarItemProps } from '../../../types/style-types';

export const SettingsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background-color: #111111;
  flex: 0 0 auto;
`;

export const SettingsSidebarHeader = styled.header`
  width: 100%;
  padding: 36px;
  font-weight: 500;
  box-sizing: border-box;
  & .title {
    font-size: 20px;
  }
`;

export const SettingsSidebarItemContainer = styled.div``;

export const SettingsSidebarItemStyle = styled.div<SettingsSidebarItemProps>`
  padding: 10px 24px;
  cursor: pointer;
  & .settingItem {
    display: flex;
    align-items: center;
    user-select: none;
    padding: 9px 8px;
    border-radius: 8px;
    gap: 10px;
    background-color: ${({ isActive }) => isActive && '#070707'};

    & .settingItem_label {
      font-weight: 500;
    }
  }
`;
