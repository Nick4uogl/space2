import { NavLink } from 'react-router-dom';

import placeholderImage from '../../assets/img/noname.svg';

const ProfileNavigation = ({ user }) => {
  return (
    <div className="top-profile">
      <div className="user-profile flex-align-center">
        <img
          src={
            user?.image
              ? `data:image/png;base64, ${user.image}`
              : placeholderImage
          }
          alt=""
        />
        <div>
          <h2 className="user-profile__name">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="user-profile__email">{user?.email}</p>
        </div>
      </div>
      <div className="navigation-profile flex-align-center">
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            `navigation-profile__item ${
              isActive ? 'navigation-profile__item--active' : ''
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to={'/subscription'}
          className={({ isActive }) =>
            `navigation-profile__item ${
              isActive ? 'navigation-profile__item--active' : ''
            }`
          }
        >
          Subscription
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileNavigation;
