import { Icon as IconType } from 'akar-icons';
import { useSelector } from 'react-redux';
import { IconBadge, UserSidebarItemStyle } from '../../../utils/styles';
import { RootState } from '../../../store';

type Props = {
  id: string;
  active?: boolean;
  onClick: () => void;
  icon: IconType;
};

const ICON_SIZE = 30;
const STROKE_WIDTH = 2;

function UserSidebarItem({ id, active = false, onClick, icon: Icon }: Props) {
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests);
  return (
    <UserSidebarItemStyle active={active} onClick={onClick}>
      <Icon scale={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
      {id === 'friends' && friendRequests.length > 0 && (
        <IconBadge>{friendRequests.length > 10 ? '10+' : friendRequests.length}</IconBadge>
      )}
    </UserSidebarItemStyle>
  );
}

export default UserSidebarItem;
