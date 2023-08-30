import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatAdd } from 'akar-icons';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

import {
  ConversationScrollableContainer,
  ConversationSearchbar,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
  ConversationSidebarContainer
} from '../../utils/styles';

import CreateConversationModal from '../modals/create-conversation-modal';
import CreateGroupModal from '../modals/create-group-modal';

import ConversationTab from './conversation-tab';
import ConversationSidebarItem from './conversation-sidebar-item';
import GroupSidebarItem from '../groups/group-sidebar-item';
import { RootState } from '../../store';

export default function ConversationSidebar() {
  const [showModal, setShowModal] = useState(false);
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);

  const conversations = useSelector((state: RootState) => state.conversations.conversations);
  const groups = useSelector((state: RootState) => state.groups.groups);

  const openModal = () => setShowModal(true);

  return (
    <>
      {showModal && conversationType === 'private' && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === 'group' && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <ConversationSearchbar placeholder="Search for Conversations" />
          {conversationType === 'private' ? (
            <ChatAdd cursor="pointer" size={30} onClick={openModal} strokeWidth={2} />
          ) : (
            <AiOutlineUsergroupAdd cursor="pointer" onClick={openModal} size={30} strokeWidth={2} />
          )}
        </ConversationSidebarHeader>
        <ConversationTab />
        <ConversationScrollableContainer>
          <ConversationSidebarContainer>
            {conversationType === 'private'
              ? conversations.map((conversation) => (
                  <ConversationSidebarItem conversation={conversation} key={conversation.id} />
                ))
              : groups.map((group) => <GroupSidebarItem group={group} key={group.id} />)}
          </ConversationSidebarContainer>
        </ConversationScrollableContainer>
      </ConversationSidebarStyle>
    </>
  );
}
