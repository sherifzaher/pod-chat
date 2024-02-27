import styled, { css } from 'styled-components';

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin: 4px 0;
  height: 20px;
  max-height: 100px;
  color: ${({ theme }) => theme.messagePanel.inputContainer.color};
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const OnBoardingInputField = styled.input`
  background-color: #101010;
  color: #fff;
  outline: none;
  border: none;
  padding: 16px 18px;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  border-radius: 8px;
  width: 100%;
  margin: 8px 0;
  &::placeholder {
    color: grey;
  }
`;

export const OnBoardingAboutField = styled.textarea`
  resize: none;
  background-color: #101010;
  color: #fff;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 20px;
  width: 100%;
  height: 100px;
  margin: 8px 0;
  &::placeholder {
    color: #353535;
    font-style: italic;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FileInput = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;

export const UploadAvatarButton = styled.div`
  width: 100%;
  background-color: #202020;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  margin: 10px 0;
  & label {
    padding: 20px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
  }
`;

export const SubmitOnboardingFormButton = styled.button`
  width: 100%;
  background-color: #390096;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  cursor: pointer;
  margin: 10px 0;
`;

export const UploadedAvatarContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #101010;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  & .side {
    display: flex;
    align-items: center;
    gap: 20px;
    & .fileName {
      word-wrap: break-word;
    }
  }
`;

export const UploadedAvatar = styled.img`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 8px;
`;
