import React, { PropsWithChildren } from 'react';
import { ModalContainerStyle, ModalContentBodyStyle, ModalHeaderStyle } from '../../utils/styles';

export const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => (
  <ModalHeaderStyle>{children}</ModalHeaderStyle>
);

export const ModalContentBody: React.FC<PropsWithChildren> = ({ children }) => (
  <ModalContentBodyStyle>{children}</ModalContentBodyStyle>
);

type ModalContainerProps = Partial<{
  showModal: boolean;
}>;

export const ModalContainer: React.FC<PropsWithChildren & ModalContainerProps> = ({
  children,
  showModal
}) => <ModalContainerStyle showModal={showModal}>{children}</ModalContainerStyle>;
