import { CircularProgress } from '@mui/material';
const Loading = () => {
  return (
    <CircularProgress
      size={55}
      sx={{
        color: '#51CE7B',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-22.5px',
      }}
    />
  );
};

export default Loading;
