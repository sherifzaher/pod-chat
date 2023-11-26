import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

import { useAuthContext } from '../../context/auth-context';

type Props = {
  isRecipientTyping: boolean;
};

export default function MessagePanel({ isRecipientTyping }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { user } = useAuthContext();
  const { conversations, loading } = useSelector((state: RootState) => state.conversations);
  const conversation = conversations.find((conv) => conv.id === Number(id!));

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBody ref={ref}>
        <MessageContainer />
      </MessagePanelBody>
      <MessagePanelFooter>
        <MessageInputField />
        <MessageTypingStatus isRecipientTyping={isRecipientTyping}>
          {isRecipientTyping &&
            `${getRecipientFromConversation(conversation!, user!).firstName} is typing ...`}
        </MessageTypingStatus>
      </MessagePanelFooter>
    </MessagePanelStyle>
  );
}
