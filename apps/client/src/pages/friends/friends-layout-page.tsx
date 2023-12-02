import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FriendsNavbarItems } from '../../utils/constants';
import { FriendsNavbar, FriendsNavbarItem, FriendsPageStyle } from '../../utils/styles/friends';
import FriendsPage from './friends-page';

function FriendsLayoutPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <FriendsPageStyle>
      <FriendsNavbar>
        {FriendsNavbarItems.map((item) => (
          <FriendsNavbarItem
            key={item.id}
            active={pathname === item.pathname}
            onClick={() => navigate(item.pathname)}>
            {item.label}
          </FriendsNavbarItem>
        ))}
      </FriendsNavbar>
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
}

export default FriendsLayoutPage;
