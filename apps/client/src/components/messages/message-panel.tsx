import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatus
} from '../../utils/styles';
import { getRecipientFromConversation } from '../../utils/helpers';

import MessagePanelHeader from './message-panel-header';
import MessageContainer from './message-container';
import MessageInputField from './message-input-field';

import { RootState } from '../../store';
import MessageAttachmentContainer from './attachments/message-attachment-container';
import { clearAllMessages } from '../../store/slices/system-message-slice';
import ConversationCall from '../conversations/conversation-call';

type Props = {
  isRecipientTyping: boolean;
};

export default function MessagePanel({ isRecipientTyping }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { messageCounter } = useSelector((state: RootState) => state.systemMessages);
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const callState = useSelector((state: RootState) => state.call);
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { conversations, loading } = useSelector((state: RootState) => state.conversations);
  const conversation = conversations.find((conv) => conv.id === Number(id!));

  useEffect(() => {
    return () => {
      dispatch(clearAllMessages());
    };
  }, [dispatch]);

  return (
    <MessagePanelStyle>
      {callState.isCalling || callState.isCallInProgress ? (
        <ConversationCall />
      ) : (
        <MessagePanelHeader />
      )}
      <MessagePanelBody ref={ref}>
        <MessageContainer />
      </MessagePanelBody>
      <MessagePanelFooter>
        {attachments.length > 0 && <MessageAttachmentContainer />}
        <MessageInputField />
        <MessageTypingStatus isRecipientTyping={isRecipientTyping}>
          {isRecipientTyping &&
            `${getRecipientFromConversation(conversation!, user!).firstName} is typing ...`}
        </MessageTypingStatus>
      </MessagePanelFooter>
    </MessagePanelStyle>
  );
}
