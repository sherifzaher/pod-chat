import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Crown, PersonCross, Person } from 'akar-icons';

import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { getUserContextMenuIcon, isGroupOwner } from '../../utils/helpers';
import { AppDispatch, RootState } from '../../store';
import { removeGroupRecipientThunk, updateGroupOwnerThunk } from '../../store/slices/group-slice';

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
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const selectedUser = useSelector((state: RootState) => state.groupSidebar.selectedUser);
  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(groupId!, 10)
  );
  const isOwner = isGroupOwner(user!, group!);

  const kickUser = () => {
    console.log('Kick user');
    console.log(selectedUser?.firstName, selectedUser?.lastName);
    if (!selectedUser || !groupId) return;

    const params: RemoveGroupRecipientParams = {
      id: parseInt(groupId, 10),
      userId: parseInt(selectedUser.id, 10)
    };
    dispatch(removeGroupRecipientThunk(params));
  };

  const transferOwner = () => {
    console.log(`Transfering Group Owner to ${selectedUser?.id}`);
    if (!selectedUser) return;
    dispatch(updateGroupOwnerThunk({ id: Number(groupId!), newOwnerId: Number(selectedUser.id) }));
  };

  if (!user || !group) return null;
  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem>
        <Person size={20} color="#7c7c7c" />
        <span style={{ color: '#7c7c7c' }}>Profile</span>
      </ContextMenuItem>
      {isOwner && user?.id !== selectedUser?.id && (
        <>
          <ContextMenuItem onClick={kickUser}>
            <PersonCross size={20} color="#ff0000" />
            <span style={{ color: '#ff0000' }}>Kick User</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={transferOwner}>
            <Crown size={20} color="#FFB800" />
            <span style={{ color: '#FFB800' }}>Transfer Owner</span>
          </ContextMenuItem>
        </>
      )}
      {/* {contextMenuActions.map((item) => ( */}
      {/*  <ContextMenuItem key={item.label}> */}
      {/*    <CustomIcon type={item.action} /> */}
      {/*    <span style={{ color: item.color }}>{item.label}</span> */}
      {/*  </ContextMenuItem> */}
      {/* ))} */}
    </ContextMenu>
  );
}
