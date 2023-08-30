import { ChatDots, Person, ArrowCycle } from 'akar-icons';
import { useState } from 'react';

import { UserAvatar, UserSidebarItem, UserSidebarStyle } from '../../utils/styles';
import CreateConversationModal from '../modals/create-conversation-modal';

import avatar from '../../__assets__/avatar_1.png';
import styles from './index.module.scss';

const ICON_SIZE = 30;
const STROKE_WIDTH = 2;

export default function UserSidebar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      {/* <UserSidebarStyle> */}
      {/*  <UserSidebarTop> */}
      {/*    <UserAvatar src={avatar} width="55px" /> */}
      {/*    <hr className={styles.hr} /> */}
      {/*    <UserSidebarTopIcons> */}
      {/*      <ChatAdd onClick={() => setShowModal(true)} size={38} /> */}
      {/*      <Person size={38} /> */}
      {/*    </UserSidebarTopIcons> */}
      {/*  </UserSidebarTop> */}
      {/*  <UserSidebarBottom> */}
      {/*    <SignOut size={38} /> */}
      {/*  </UserSidebarBottom> */}
      {/* </UserSidebarStyle> */}

      <UserSidebarStyle>
        <UserAvatar src={avatar} width="55px" alt="avatar" />
        <hr className={styles.hr} />
        <UserSidebarItem active>
          <ChatDots scale={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem>
          <Person scale={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem>
          <ArrowCycle scale={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
      </UserSidebarStyle>
    </>
  );
}
