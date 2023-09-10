import { IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
import { ReactComponent as NextSvg } from '../../assets/img/icons/next.svg';

const NetworkLeft = ({
  isSharedNetwork,
  previousNetworkId,
  nextNetworkId,
  currentNetwork,
}) => {
  const navigate = useNavigate();

  return (
    <div className="network-page-left">
      <div className="network-page-left__top flex-space">
        <Button
          variant="text"
          color="inherit"
          className="network-page__back flex-align-center grey-15-700"
          onClick={() => navigate(`${isSharedNetwork ? '/share' : '/'}`)}
          sx={{
            fontFamily: 'inherit',
            fontWeight: '700',
            color: '#6F7F8F',
            textTransform: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          <ArrowLeft fill="#6F7F8F" width="1.5rem" height="1.5rem" />
          Back to Networks
        </Button>
        <div className="network-page__navigation flex-align-center">
          <IconButton
            sx={{
              width: '1.6625rem',
              height: '1.6625rem',
              border: '1px solid #eef0f3',
              transform: 'rotate(180deg)',
            }}
            onClick={() => navigate(`/network/${previousNetworkId}`)}
          >
            <NextSvg width="0.8rem" height="0.8rem" />
          </IconButton>
          <IconButton
            sx={{
              width: '1.6625rem',
              height: '1.6625rem',
              border: '1px solid #eef0f3',
            }}
            onClick={() => navigate(`/network/${nextNetworkId}`)}
          >
            <NextSvg width="0.8rem" height="0.8rem" />
          </IconButton>
        </div>
      </div>
      <div
        className="network-page__preview"
        style={{
          backgroundImage: `url('data:image/png;base64, ${currentNetwork?.image}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 0',
        }}
      ></div>
    </div>
  );
};

export default NetworkLeft;
