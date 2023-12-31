import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import GroupSidebarItem from '../groups/group-sidebar-item';
import ConversationTab from '../conversations/conversation-tab';
import ConversationSidebarItem from '../conversations/conversation-sidebar-item';
import GroupSidebarContextMenu from '../context-menus/group-sidebar-context-menu';

import { RootState } from '../../store';
import {
  setContextMenuPoints,
  setSelectedGroup,
  toggleContextMenu
} from '../../store/slices/group-slice';

export default function ConversationSidebar() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type);
  const showGroupContextMenu = useSelector((state: RootState) => state.groups.showContextMenu);
  const conversations = useSelector((state: RootState) => state.conversations.conversations);
  const groups = useSelector((state: RootState) => state.groups.groups);

  const openModal = () => setShowModal(true);

  const onContextMenu = useCallback(
    (event: ContextMenuEvent, group: Group) => {
      event.preventDefault();
      const points: Points = {
        x: event.pageX,
        y: event.pageY
      };
      dispatch(setSelectedGroup(group));
      dispatch(setContextMenuPoints(points));
      dispatch(toggleContextMenu(true));
    },
    [dispatch]
  );

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
              : groups.map((group) => (
                  <GroupSidebarItem onContextMenu={onContextMenu} group={group} key={group.id} />
                ))}
            {showGroupContextMenu && <GroupSidebarContextMenu />}
          </ConversationSidebarContainer>
        </ConversationScrollableContainer>
      </ConversationSidebarStyle>
    </>
  );
}
