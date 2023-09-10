import { useSelector } from 'react-redux';

import ProfileNavigation from './ProfileNavigation';
import Header from '../../components/Header/Header.jsx';
import { selectUser } from '../../redux/user/userSlice';
import './profile.scss';

function ProfileWrapper({ children }) {
  const user = useSelector(selectUser);

  return (
    <div className="profile">
      <Header />
      <ProfileNavigation user={user} />
      {children}
    </div>
  );
}

export default ProfileWrapper;
