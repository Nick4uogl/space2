import { useState, useRef } from 'react';

import { IconButton, Popover } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { ReactComponent as Plus } from '../../assets/img/icons/plus.svg';
import { ReactComponent as Search } from '../../assets/img/icons/Search.svg';
import logo from '../../assets/img/KnetMinerLogo.svg';
import noImageSvg from '../../assets/img/noname.svg';
import { logOut } from '../../redux/auth/authActions';
import { selectUser } from '../../redux/user/userSlice';

import './header.scss';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    dispatch(logOut());
    navigate('/sign-in');
  };
  return (
    <div className={'header'}>
      <div className={'header__container'}>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
        <div className={'header__right'}>
          <Link to={'/resources'} className="header__link txt-w-14">
            New Search
            <Plus fill="#fff" />
          </Link>
          <div className={'header__search'}>
            <input type="text" placeholder="Search" ref={searchInputRef} />
            <IconButton
              onClick={() =>
                searchInputRef.current && searchInputRef.current.focus()
              }
              sx={{ position: 'absolute', top: '2px', left: '3px' }}
            >
              <Search width="20" height="20" />
            </IconButton>
          </div>
          <div className="header__avatar">
            <button onClick={handleMenuOpen}>
              <img
                src={
                  user?.image
                    ? `data:image/png;base64, ${user.image}`
                    : noImageSvg
                }
                alt={user?.username}
              />
            </button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              sx={{ top: '3.5rem', left: '-2.25rem' }}
            >
              <div className="header__menu">
                <li className={` ${'menu__item-1'}`}>
                  <img
                    src={
                      user?.image
                        ? `data:image/png;base64, ${user.image}`
                        : noImageSvg
                    }
                    alt=""
                  />
                  <div>
                    <h2 className={`${'menu__name'}`}>
                      {user?.first_name && user?.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : 'nonamee312'}
                    </h2>
                    <p>{user?.email ? user.email : 'noname312@gmail.com'}</p>
                  </div>
                </li>
                <li onClick={handleMenuClose}>
                  <Link className="menu__item" to="/resources">
                    Resources
                  </Link>
                </li>
                <li onClick={handleMenuClose}>
                  <Link className="menu__item" to={'/'}>
                    My Networks
                  </Link>
                </li>
                <li onClick={handleMenuClose}>
                  <Link className="menu__item" to={'/profile'}>
                    Account settings
                  </Link>
                </li>
                <li onClick={handleMenuClose}>
                  <button
                    onClick={handleLogOut}
                    className="menu__item menu__item-signout"
                  >
                    Sign out
                  </button>
                </li>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
