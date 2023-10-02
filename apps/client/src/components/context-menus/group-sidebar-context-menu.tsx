import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoMdExit, IoIosArchive } from 'react-icons/io';

import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { getUserContextMenuIcon } from '../../utils/helpers';

import { AppDispatch, RootState } from '../../store';
import { useAuthContext } from '../../context/auth-context';
import { leaveGroupThunk, toggleContextMenu } from '../../store/slices/group-slice';

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
  // const { id: groupId } = useParams();
  const { user } = useAuthContext();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector((state: RootState) => state.groups.points);
  const groupId = useSelector((state: RootState) => state.groups.selectedGroup?.id);

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
    const handleCloseMenu = (e: MouseEvent) => {
      if (e.target !== menuRef.current) {
        dispatch(toggleContextMenu(false));
      }
    };

    window.addEventListener('resize', handleResize);
    // window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('resize', handleResize);
      // window.removeEventListener('mousedown', handleCloseMenu);
    };
  }, [dispatch, menuRef]);

  const handleLeaveGroup = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      dispatch(leaveGroupThunk(groupId!));
    },
    [dispatch, groupId]
  );

  if (!user || !groupId) return null;

  return (
    <ContextMenu top={points.y} left={points.x} ref={menuRef}>
      <ContextMenuItem onClick={handleLeaveGroup}>
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
