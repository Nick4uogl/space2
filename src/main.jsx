import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.scss';

import App from './App.jsx';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="453105480016-icrcm4cessggvrbaddaobi5010ncvga6.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
);
