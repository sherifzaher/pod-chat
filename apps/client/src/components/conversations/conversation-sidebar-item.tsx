import { useNavigate } from 'react-router-dom';
import { ConversationSidebarItemStyle } from '../../utils/styles';
import styles from './index.module.scss';
import { getRecipientFromConversation } from '../../utils/helpers';
import { useAuthContext } from '../../context/auth-context';

type Props = {
  conversation: Conversation;
};

const MESSAGE_LENGTH_MAX = 50;

export default function ConversationSidebarItem({ conversation }: Props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const recipient = getRecipientFromConversation(conversation, user!);

  const lastMessageContent = () => {
    const { lastMessageSent } = conversation;
    if (lastMessageSent)
      return lastMessageSent.content.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content;
    return null;
  };

  return (
    <>
      <ConversationSidebarItemStyle onClick={() => navigate(`/conversations/${conversation.id}`)}>
        <div className={styles.conversationAvatar} />
        <div className={styles.contentContainer}>
          <span className={styles.conversationName}>
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
          <span className={styles.conversationLastMessage}>{lastMessageContent()}</span>
        </div>
      </ConversationSidebarItemStyle>
      <hr className={styles.hr} />
    </>
  );
}
