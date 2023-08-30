import { useNavigate } from 'react-router-dom';
import { ConversationSidebarItemStyle } from '../../utils/styles';

import styles from './index.module.scss';

type Props = {
  group: Group;
};

export default function GroupSidebarItem({ group }: Props) {
  const navigate = useNavigate();

  return (
    <ConversationSidebarItemStyle onClick={() => navigate(`/groups/${group.id}`)}>
      <div className={styles.groupAvatar} />
      <div>
        <span className={styles.groupName}>{group?.title || 'Group'}</span>
        <span className={styles.groupLastMessage}>{group.lastMessageSent?.content}</span>
      </div>
    </ConversationSidebarItemStyle>
  );
}
