import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FriendsNavbarItems } from '../../utils/constants';
import { FriendsNavbar, FriendsNavbarItem, FriendsPageStyle } from '../../utils/styles/friends';

function FriendsPage() {
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
      {pathname === '/friends' && <div>Friends Component</div>}
      <Outlet />
    </FriendsPageStyle>
  );
}

export default FriendsPage;
