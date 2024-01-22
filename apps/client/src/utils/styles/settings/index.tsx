import styled, { css } from 'styled-components';
import { SettingsSidebarItemProps, UserBannerProps } from '../../../types/style-types';
import { slideDown, slideUp } from '../keyframes';

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

export const SettingsProfileBanner = styled.div<UserBannerProps>`
  width: 100%;
  height: 200px;
  position: relative;
  cursor: pointer;
  ${({ backgroundUrl }) =>
    backgroundUrl
      ? css`
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url('${backgroundUrl}') no-repeat center;
          opacity: 50%;
          transition: 200ms opacity ease;
          background-size: cover;

          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `};
  &::before {
    background-color: none;
    content: 'Change Banner';
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b5b5b5;
    font-size: 20px;
    font-weight: 500;
    opacity: 0;
    transition: 250ms opacity ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const ProfileSections = styled.div`
  padding: 0 32px;
`;

export const SettingsProfileUserDetails = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  position: relative;
  transform: translateY(-50%);
  gap: 30px;
  box-sizing: border-box;
  & .avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 4px solid #292929;
    background-color: #2a2a2a;
  }
  & .username {
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    bottom: 0;
    left: 120px;
  }
`;

export const ProfileAboutSection = styled.div`
  padding: 24px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #111111;
  width: 500px;
  & label {
    font-size: 18px;
    font-weight: 500;
  }
  & .about_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ProfileDescriptionField = styled.textarea`
  background-color: #111111;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin-top: 20px;
  height: 100px;
  color: #ffffff;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  font-weight: 500;
  &::-webkit-scrollbar {
    display: none;
  }

  &:disabled {
    color: #484848;
  }
`;

export const ProfileEditButtonActionsBar = styled.div`
  background-color: #0e0e0e;
  width: 600px;
  height: 70px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  animation: 500ms ${slideUp} ease forwards;
  border-radius: 8px;
  & .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
