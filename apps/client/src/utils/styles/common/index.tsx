import styled from 'styled-components';
import { FlexProps } from '../../../types/style-types';

export const FlexBox = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
