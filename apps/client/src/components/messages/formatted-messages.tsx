import { formatRelative } from 'date-fns';
import { useSelector } from 'react-redux';
import {
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader
} from '../../utils/styles';
import EditMessageContainer from './edit-message-container';
import { RootState } from '../../store';

type FormattedMessageProps = {
  // eslint-disable-next-line react/require-default-props
  user?: User;
  message: Message | GroupMessageType;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FormattedMessage({
  user,
  message,
  onContextMenu,
  onEditMessageChange
}: FormattedMessageProps) {
  const { isEditing, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  if (message.content === 'lol') {
  }
  console.log(message.content);

  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? '#757575' : '#5E8BFF'
            }}>
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">{formatRelative(new Date(message.createdAt), new Date())}</span>
        </MessageItemHeader>
        {isEditing && message.id === messageBeingEdited?.id ? (
          <MessageItemContent padding="0 0 0 2px">
            <EditMessageContainer onEditMessageChange={onEditMessageChange} />
          </MessageItemContent>
        ) : (
          <MessageItemContent padding="4px 0 0 2px">
            {message?.content}
            <div>
              {message?.attachments &&
                message.attachments.map((attachment) => (
                  <img
                    key={attachment.id}
                    width="100px"
                    height="100px"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                    src={attachment.attachmentUrl}
                    alt=""
                  />
                ))}
            </div>
          </MessageItemContent>
        )}
      </MessageItemDetails>
    </MessageItemContainer>
  );
}
