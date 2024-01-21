import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IconBadge, UserAvatar, UserSidebarStyle } from '../../utils/styles';
import CreateConversationModal from '../modals/create-conversation-modal';
import avatar from '../../__assets__/avatar_1.png';
import styles from './index.module.scss';
import { UserSidebarItems } from '../../utils/constants';
import { RootState } from '../../store';
import UserSidebarItem from './sidebar-items/user-sidebar-item';

export default function UserSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests);

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
        {UserSidebarItems.map(({ id, href, icon }) => (
          <UserSidebarItem
            key={id}
            id={id}
            icon={icon}
            active={isActive(href, id)}
            onClick={() => navigate(href)}
          />
        ))}
      </UserSidebarStyle>
    </>
  );
}
