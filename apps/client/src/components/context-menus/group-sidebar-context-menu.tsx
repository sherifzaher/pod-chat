import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoMdExit, IoIosArchive } from 'react-icons/io';

import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { getUserContextMenuIcon } from '../../utils/helpers';

import { AppDispatch, RootState } from '../../store';
import { useAuthContext } from '../../context/auth-context';
import { toggleContextMenu } from '../../store/slices/group-slice';

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

export default function GroupSidebarContextMenu() {
  const { id: groupId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuthContext();
  const points = useSelector((state: RootState) => state.groups.points);
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(groupId!, 10)
  );

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (!user) return null;

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem>
        <IoMdExit size={20} color="#ff0000" />
        <span style={{ color: '#ff0000' }}>Leave Group</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <IoIosArchive size={20} color="#fff" />
        <span style={{ color: '#fff' }}>Archive Group</span>
      </ContextMenuItem>
    </ContextMenu>
  );
}
