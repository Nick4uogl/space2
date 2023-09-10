import { Snackbar } from '@mui/material';

import StyledAlert from './StyledAlert';
import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';

const Popup = ({
  openAlert,
  handleAlertClose,
  alertSeverity,
  alertText,
  sx,
}) => {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        ...sx,
      }}
    >
      <StyledAlert
        onClose={handleAlertClose}
        severity={alertSeverity}
        icon={false}
        action={
          <button
            onClick={handleAlertClose}
            className={`alert-action-close ${
              alertSeverity === 'success' && 'alert-action-close--success'
            }`}
          >
            <CloseIcon fill="#fff" width="0.7rem" height="0.7rem" />
          </button>
        }
        sx={{
          backgroundColor: `${
            alertSeverity === 'error'
              ? '#F34A4A'
              : alertSeverity === 'success'
              ? '#51CE7B'
              : '#FF6948'
          }`,
        }}
      >
        {alertText}
      </StyledAlert>
    </Snackbar>
  );
};

export default Popup;
