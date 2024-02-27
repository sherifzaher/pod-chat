import { FC } from 'react';
import { RiAlertFill, RiInformationLine } from 'react-icons/ri';
import { SystemMessageContainer } from '../../../utils/styles';

type Props = {
  message: SystemMessageType;
};

const getSystemIcon = (type: SystemMessageLevel) => {
  switch (type) {
    case 'info':
      return RiInformationLine;
    case 'warning':
    case 'error':
      return RiAlertFill;
    default:
      return RiInformationLine;
  }
};

export const SystemMessage: FC<Props> = ({ message }) => {
  const { content, level } = message;
  const Icon = getSystemIcon(level);
  return (
    <SystemMessageContainer>
      <div className="header">
        <Icon className="icon" />
        <span>System Message</span>
      </div>
      <div>
        <span className="content">{content}</span>
      </div>
    </SystemMessageContainer>
  );
};
