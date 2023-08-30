import { useAuthContext } from '../../context/auth-context';
import { ConversationChannelPageStyle } from '../../utils/styles';

function ConversationPanel() {
  const { user } = useAuthContext();
  return (
    <ConversationChannelPageStyle>
      ConversationPanel
      {user?.email}
    </ConversationChannelPageStyle>
  );
}

export default ConversationPanel;
