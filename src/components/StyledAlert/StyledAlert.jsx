import { Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/system';

const StyledAlert = styled(Alert)(() => ({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#51ce7b',
  },
  '& .MuiAlert-action': {
    padding: '0',
    top: 'auto',
    paddingRight: '0.9rem',
  },
  '& .MuiAlert-message': {
    padding: '0',
    paddingLeft: '1.2rem',
  },
  padding: '1rem 0.5rem',
  gap: '0.63rem',
  width: '100%',
  color: '#fff',
  borderRadius: '1.25rem',
  alignItems: 'center',
}));

export default StyledAlert;
