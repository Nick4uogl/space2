import { useSelector } from 'react-redux';

import { selectTokens } from './redux/auth/authSlice';
import { useGetUserQuery } from './redux/user/userApiSlice';
import AppRouter from './routes';

function App() {
  const tokens = useSelector(selectTokens);
  const skip = tokens;
  useGetUserQuery({ skip });

  return <AppRouter />;
}

export default App;
