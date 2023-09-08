import { keyframes } from 'styled-components';

export const fadeInUpwards = keyframes`
  from {
    transform: translateY(20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideRightToLeft = keyframes`
  from {
    transform: translateX(20%)
  } to {
  transform: translateX(0%);
    }
`;
