import { formatRelative } from 'date-fns';
import { FC, useContext } from 'react';
import { useAuthContext } from '../../../context/auth-context';
import { MessageItemHeaderContainer } from '../../../utils/styles';

type Props = {
  message: Message | GroupMessageType;
};

export const MessageItemHeader: FC<Props> = ({ message }) => {
  const { user } = useAuthContext();
  return (
    <MessageItemHeaderContainer>
      <span
        className="authorName"
        style={{
          color: user?.id === message.author.id ? '#989898' : '#5E8BFF'
        }}>
        {message.author.firstName} {message.author.lastName}
      </span>
      <span className="time">{formatRelative(new Date(message.createdAt), new Date())}</span>
    </MessageItemHeaderContainer>
  );
};
