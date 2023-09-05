import { PeopleGroup } from 'akar-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  GroupRecipientSidebarItem,
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle,
  MessageItemAvatar
} from '../../utils/styles';
import { RootState } from '../../store';

export default function GroupRecipientsSidebar() {
  const { id } = useParams();

  const group = useSelector((state: RootState) => state.groups.groups).find(
    (groupItem) => groupItem.id === parseInt(id!, 10)
  );
  console.log(group);
  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
        <PeopleGroup />
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        {group?.users.map((user) => (
          <GroupRecipientSidebarItem key={user.id}>
            <MessageItemAvatar />
            <span>{user.firstName}</span>
          </GroupRecipientSidebarItem>
        ))}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
}
