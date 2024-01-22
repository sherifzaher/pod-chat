import { useSelector } from 'react-redux';

import { ConversationChannelPageStyle } from '../../utils/styles';
import { RootState } from '../../store';

function ConversationPanel() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <ConversationChannelPageStyle>
      ConversationPanel
      {user?.username}
    </ConversationChannelPageStyle>
  );
}

export default ConversationPanel;
