import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FriendsPageStyle } from '../../utils/styles/friends';
import FriendsPage from './friends-page';
import FriendsPageNavbar from '../../components/navbar/friends-page-navbar';

function FriendsLayoutPage() {
  const { pathname } = useLocation();
  return (
    <FriendsPageStyle>
      <FriendsPageNavbar />
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
}

export default FriendsLayoutPage;
