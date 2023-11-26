import styled from 'styled-components';

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin: 4px 0;
  height: 20px;
  max-height: 100px;
  color: #ffffff;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
