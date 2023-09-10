import { styled, Button, TextField } from '@mui/material';

export const ButtonLinkOutlined = styled(Button)(() => ({
  borderRadius: '0.5rem',
  whiteSpace: 'nowrap',
  gap: '1.9rem',
  border: '1px solid #9ba7ba',
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.875rem',
  lineHeight: '142%',
  color: '#121212',
  textTransform: 'none',
  alignItems: 'center',
  fontFamily: 'Nexa',
}));
export const ButtonLink = styled(Button)(() => ({
  borderRadius: '0.5rem',
  whiteSpace: 'nowrap',
  gap: '1.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.875rem',
  lineHeight: '142%',
  color: '#6F7F8F',
  textTransform: 'none',
  fontFamily: 'Nexa',
}));
export const GreenButton = styled(Button)(() => ({
  background: 'var(--main-green)',
  borderRadius: '0.3125rem',
  color: '#fff',
  fontSize: '0.9375rem',
  fontWeight: '700',
  lineHeight: '1.25',
  padding: '0.94rem 1.88rem',
  textTransform: 'none',
  fontFamily: 'Nexa',
  display: 'inline-block',
  width: 'auto',
  '&:hover': {
    backgroundColor: 'var(--main-green)',
  },
}));
export const CssTextField = styled(TextField)(() => ({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#51ce7b',
  },
  '& .MuiInput-input': {
    paddingBottom: '1.25rem',
    fontFamily: 'Nexa',
    lineHeight: '1.875',
  },
  '& .MuiInputLabel-root': {
    color: '#6F7F8F',
    textTransform: 'uppercase',
  },
  '& .MuiInputLabel-animated': {
    color: '#6F7F8F',
    textTransform: 'uppercase',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#6F7F8F',
  },
  '& .MuiInput-underline.Mui-error:after': {
    borderBottomColor: '#F34A4A',
  },
}));
