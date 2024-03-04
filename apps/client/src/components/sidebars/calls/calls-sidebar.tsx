import { useSelector } from 'react-redux';
import { ScrollableContainer, SidebarHeader, SidebarStyles } from '../../../utils/styles';
import { RootState } from '../../../store';
import CallSidebarItem from '../../calls/call-sidebar-item';

export default function CallsSidebar() {
  const { friends } = useSelector((state: RootState) => state.friends);

  return (
    <SidebarStyles>
      <SidebarHeader>Friends</SidebarHeader>
      <ScrollableContainer>
        {friends.map((friend) => (
          <CallSidebarItem key={friend.id} friend={friend} />
        ))}
      </ScrollableContainer>
    </SidebarStyles>
  );
}
