import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { UserAvatar, UserSidebarStyle } from '../../utils/styles';
import avatar from '../../__assets__/avatar_1.png';
import styles from './index.module.scss';
import { UserSidebarItems } from '../../utils/constants';
import UserSidebarItem from './sidebar-items/user-sidebar-item';
import { useAuth } from '../../hooks/useAuth';
import { UpdatePresenceStatusModal } from '../modals/update-presence-status-modal';

export default function UserSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  function isActive(href: string, id: string) {
    if (id === 'conversations' && pathname.includes('/group')) return true;
    return pathname.includes(href);
  }

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar
          src={user?.profile?.avatar ?? avatar}
          width="55px"
          alt="avatar"
          onClick={() => setShowModal(true)}
        />
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
