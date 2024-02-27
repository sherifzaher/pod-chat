import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ConversationSidebarItemDetails, ConversationSidebarItemStyle } from '../../utils/styles';
import { getRecipientFromConversation } from '../../utils/helpers';
import { RootState } from '../../store';
import styles from './index.module.scss';

type Props = {
  conversation: Conversation;
};

const MESSAGE_LENGTH_MAX = 50;

export default function ConversationSidebarItem({ conversation }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const recipient = getRecipientFromConversation(conversation, user!);

  const lastMessageContent = () => {
    const { lastMessageSent } = conversation;
    if (lastMessageSent && lastMessageSent.content)
      return lastMessageSent.content?.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content?.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content;
    return null;
  };

  return (
    <>
      <ConversationSidebarItemStyle
        selected={parseInt(id!, 10) === conversation.id}
        onClick={() => navigate(`/conversations/${conversation.id}`)}>
        {recipient?.profile?.avatar ? (
          <img
            src={recipient.profile.avatar}
            style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '50%' }}
            alt="user profile"
          />
        ) : (
          <div className={styles.conversationAvatar} />
        )}
        <ConversationSidebarItemDetails>
          <div className={styles.contentContainer}>
            <span className={styles.conversationName}>
              {`${recipient?.firstName} ${recipient?.lastName}`}
            </span>
            <span className={styles.conversationLastMessage}>{lastMessageContent()}</span>
          </div>
        </ConversationSidebarItemDetails>
      </ConversationSidebarItemStyle>
    </>
  );
}
