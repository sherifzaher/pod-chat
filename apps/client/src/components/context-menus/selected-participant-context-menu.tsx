import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { userContextMenuItems } from '../../utils/constants';
import { getUserContextMenuIcon } from '../../utils/helpers';

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
  return (
    <ContextMenu top={points.y} left={points.x}>
      {userContextMenuItems.map((item) => (
        <ContextMenuItem key={item.label}>
          <CustomIcon type={item.action} />
          <span style={{ color: item.color }}>{item.label}</span>
        </ContextMenuItem>
      ))}
    </ContextMenu>
  );
}
