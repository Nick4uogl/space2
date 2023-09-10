import './authWrapper.scss';
import AuthLeft from '../AuthLeft/AuthLeft';
import Popup from '../StyledAlert/Popup';

function AuthWrapper({
  children,
  error,
  handleAlertClose,
  openAlert,
  alertStyles,
}) {
  return (
    <div className={'auth-wrapper'}>
      <AuthLeft />
      <div className={'auth-right'}>
        {children}
        <Popup
          alertSeverity={'error'}
          handleAlertClose={handleAlertClose}
          openAlert={openAlert}
          alertText={error}
          sx={{ position: 'absolute', ...alertStyles }}
        />
      </div>
    </div>
  );
}

export default AuthWrapper;
