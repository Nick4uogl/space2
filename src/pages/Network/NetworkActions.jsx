import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ReactComponent as CloneSvg } from '../../assets/img/icons/copy.svg';
import { ReactComponent as DeleteSvg } from '../../assets/img/icons/delete.svg';
import { ReactComponent as DownloadSvg } from '../../assets/img/icons/download.svg';
import { ReactComponent as EditIcon } from '../../assets/img/icons/edit.svg';
import { ReactComponent as ShareIcon } from '../../assets/img/icons/share2.svg';

export const NetworkActionButton = styled(Button)(() => ({
  minWidth: 'auto',
  padding: '0px',
  border: '1px solid #bdc5ce',
  '&:hover': {
    backgroundColor: 'rgba(189, 197, 206, 0.2)',
    border: '1px solid #bdc5ce',
  },
}));

const NetworkActions = ({
  isOwner,
  handleExploreNetworkClick,
  user,
  isClonePermitted,
  handleDownload,
  setOpenSharingModal,
  handleCloneNetwork,
  currentNetwork,
  isSharingPermitted,
  handleDelete,
}) => {
  return (
    <div className="network-page__right-top flex-space">
      <Button
        type="contained"
        color="inherit"
        className="flex-align-center network-page__header-right-link"
        sx={{
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
        }}
        onClick={handleExploreNetworkClick}
      >
        Explore network <EditIcon fill="#fff" />
      </Button>
      <div className="network-page__actions flex-align-center">
        {isClonePermitted && (
          <NetworkActionButton
            variant="outlined"
            color="inherit"
            className="network-page__action-btn"
            onClick={handleCloneNetwork}
          >
            <CloneSvg fill="#BDC5CE" />
          </NetworkActionButton>
        )}

        <NetworkActionButton
          onClick={() =>
            handleDownload(currentNetwork?.image, currentNetwork?.name)
          }
          variant="outlined"
          color="inherit"
          className="network-page__action-btn"
        >
          <DownloadSvg fill="#BDC5CE" />
        </NetworkActionButton>
        {isSharingPermitted && (
          <NetworkActionButton
            onClick={() => setOpenSharingModal(true)}
            variant="outlined"
            color="inherit"
            className="network-page__action-btn"
          >
            <ShareIcon />
          </NetworkActionButton>
        )}
        {isOwner && user && (
          <NetworkActionButton
            onClick={handleDelete}
            variant="outlined"
            color="inherit"
            className="network-page__action-btn"
          >
            <DeleteSvg fill="#BDC5CE" />
          </NetworkActionButton>
        )}
      </div>
    </div>
  );
};

export default NetworkActions;
