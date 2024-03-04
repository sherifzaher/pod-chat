import { IoMdCall, IoMdVideocam } from 'react-icons/io';
import { useAuth } from '../../hooks/useAuth';
import { getUserFriendInstance } from '../../utils/helpers';
import { CallSidebarItemContainer } from '../../utils/styles';
import { UserAvatar } from '../messages/message-item-avatar';

type Props = {
  friend: Friend;
};

export default function CallSidebarItem({ friend }: Props) {
  const ICON_SIZE = 25;
  const { user } = useAuth();
  const friendInstance = getUserFriendInstance(user!, friend);
  return (
    <CallSidebarItemContainer>
      <div>
        <UserAvatar user={friendInstance} />
      </div>
      <div>
        <div>
          <span className="username">{friendInstance?.username}</span>
        </div>
        <div className="icons">
          <div className="icon">
            <IoMdVideocam size={ICON_SIZE} />
          </div>
          <div className="icon">
            <IoMdCall size={ICON_SIZE} />
          </div>
        </div>
      </div>
    </CallSidebarItemContainer>
  );
}
