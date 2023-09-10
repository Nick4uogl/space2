import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectTokens } from '../../redux/auth/authSlice';

function RequireAuth() {
  const authTokens = useSelector(selectTokens);

  return authTokens ? <Outlet /> : <Navigate to={'/sign-in'} />;
}

export default RequireAuth;
