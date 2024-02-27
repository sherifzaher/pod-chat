import { useNavigate, useParams } from 'react-router-dom';
import { ConversationSidebarItemStyle } from '../../utils/styles';

import styles from './index.module.scss';

type Props = {
  group: Group;
  onContextMenu: (e: ContextMenuEvent, group: Group) => void;
};

export default function GroupSidebarItem({ group, onContextMenu }: Props) {
  const { id } = useParams();
  const MAX_TITLE_LENGTH = 20;
  const MAX_MESSAGE_LENGTH = 50;
  const navigate = useNavigate();

  const getTransformedTitle = () => {
    if (!group.title) {
      const usersToString = group.users.map((user) => user.firstName).join(', ');
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat('...')
        : usersToString;
    }
    return group.title.length > MAX_TITLE_LENGTH
      ? group.title.slice(0, MAX_TITLE_LENGTH).concat('...')
      : group.title;
  };

  return (
    <ConversationSidebarItemStyle
      selected={parseInt(id!, 10) === group.id}
      onContextMenu={(e) => onContextMenu(e, group)}
      onClick={() => navigate(`/groups/${group.id}`)}>
      <div className={styles.groupAvatar} />
      <div>
        <span className="title">{getTransformedTitle()}</span>
        <span className={styles.groupLastMessage}>{group.lastMessageSent?.content}</span>
      </div>
    </ConversationSidebarItemStyle>
  );
}
