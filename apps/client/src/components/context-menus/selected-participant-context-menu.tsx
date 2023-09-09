import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { userContextMenuItems } from '../../utils/constants';
import { getUserContextMenuActions, getUserContextMenuIcon } from '../../utils/helpers';
import { RootState } from '../../store';
import { useAuthContext } from '../../context/auth-context';

type Props = {
  points: { x: number; y: number };
};

type CustomIconProps = {
  type: UserContextMenuActionType;
};
export const CustomIcon = ({ type }: CustomIconProps) => {
  const { icon: MyIcon, color } = getUserContextMenuIcon(type);
  return <MyIcon size={22} color={color} />;
};

export default function SelectedParticipantContextMenu({ points }: Props) {
  const { id: groupId } = useParams();
  const { user } = useAuthContext();
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(groupId!, 10)
  );
  const contextMenuActions = getUserContextMenuActions(user!, group!);

  if (!contextMenuActions) return null;
  return (
    <ContextMenu top={points.y} left={points.x}>
      {contextMenuActions.map((item) => (
        <ContextMenuItem key={item.label}>
          <CustomIcon type={item.action} />
          <span style={{ color: item.color }}>{item.label}</span>
        </ContextMenuItem>
      ))}
    </ContextMenu>
  );
}
