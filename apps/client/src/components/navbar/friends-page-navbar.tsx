import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { FriendsNavbar, FriendsNavbarItem } from '../../utils/styles/friends';
import { FriendsNavbarItems } from '../../utils/constants';
import { Button } from '../../utils/styles/button';
import CreateFriendRequestModal from '../modals/create-friend-request-modal';

function FriendsPageNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
      <FriendsNavbar>
        <div className="navLinks">
          {FriendsNavbarItems.map((item) => (
            <FriendsNavbarItem
              key={item.id}
              active={pathname === item.pathname}
              onClick={() => navigate(item.pathname)}>
              {item.label}
            </FriendsNavbarItem>
          ))}
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <AiOutlineUserAdd size={20} />
          <span>Add Friend</span>
        </Button>
      </FriendsNavbar>
    </>
  );
}

export default FriendsPageNavbar;
