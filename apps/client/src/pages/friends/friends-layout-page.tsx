import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { FriendsNavbarItems } from '../../utils/constants';
import { FriendsNavbar, FriendsNavbarItem, FriendsPageStyle } from '../../utils/styles/friends';
import FriendsPage from './friends-page';
import { Button } from '../../utils/styles/button';

function FriendsLayoutPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <FriendsPageStyle>
      <FriendsNavbar>
        <div className="navLinks">
          {FriendsNavbarItems.map((item) => (
            <FriendsNavbarItem
              key={item.id}
              active={pathname === item.pathname}
              onClick={() => navigate(item.pathname)}>
              {item.label}
            </FriendsNavbarItem>
          ))}
        </div>
        <Button size="sm">
          <AiOutlineUserAdd size={20} />
          <span>Add Friend</span>
        </Button>
      </FriendsNavbar>
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
}

export default FriendsLayoutPage;
