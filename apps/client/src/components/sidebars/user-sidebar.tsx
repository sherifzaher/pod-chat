import { ChatDots, Person, ArrowCycle } from 'akar-icons';
import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { UserAvatar, UserSidebarItem, UserSidebarStyle } from '../../utils/styles';
import CreateConversationModal from '../modals/create-conversation-modal';

import avatar from '../../__assets__/avatar_1.png';
import styles from './index.module.scss';
import { UserSidebarItems } from '../../utils/constants';

const ICON_SIZE = 30;
const STROKE_WIDTH = 2;

export default function UserSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function isActive(href: string, id: string) {
    if (id === 'conversations' && pathname.includes('/group')) return true;
    return pathname.includes(href);
  }

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar src={avatar} width="55px" alt="avatar" />
        <hr className={styles.hr} />
        {UserSidebarItems.map(({ id, href, icon: Icon }) => (
          <UserSidebarItem key={id} active={isActive(href, id)} onClick={() => navigate(href)}>
            <Icon scale={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
          </UserSidebarItem>
        ))}
      </UserSidebarStyle>
    </>
  );
}
