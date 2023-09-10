import { NetworkActionButton } from './NetworkActions';
import { ReactComponent as CopyIcon } from '../../assets/img/icons/copyLink.svg';
import noImageSvg from '../../assets/img/noname.svg';
import { ReactComponent as ToolTipIcon } from '../../assets/img/toolTip.svg';
import ToggleSwitch from '../../components/Switch/Switch';

const NetworkFooter = ({
  currentNetwork,
  networkShares,
  user,
  setCopied,
  copied,
  isOwner,
  isPublic,
  handleIsPublic,
}) => {
  console.log(networkShares, networkShares);
  return (
    <div className="network-page-footer flex-space">
      <div className="network-page__shares">
        <div className="network-page__participant">
          <img
            src={
              currentNetwork?.owner?.image
                ? `data:image/png;base64, ${currentNetwork?.owner.image}`
                : noImageSvg
            }
            style={{
              zIndex: networkShares?.[0]?.users?.length,
            }}
            alt={`${user?.image} avatar`}
          />
        </div>
        {networkShares?.[0]?.users?.map((user, i) => (
          <div key={user?.user?.id} className="network-page__participant">
            <img
              src={
                user?.user?.image
                  ? `data:image/png;base64, ${user?.user?.image}`
                  : noImageSvg
              }
              style={{
                zIndex: networkShares?.[0]?.users?.length - (i + 1),
                right: 5 * (i + 1),
              }}
              alt={`${user?.user?.image} avatar`}
            />
          </div>
        ))}
      </div>
      <div className="network-page-footer__actions flex-align-center">
        <NetworkActionButton
          onClick={() => {
            navigator.clipboard.writeText(
              `${import.meta.env.VITE_FRONTEND_URL}network/${
                currentNetwork?.id
              }`,
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: '50%' }}
          className="network-page__action-btn network-page__action-btn-frame"
        >
          <CopyIcon fill="#BDC5CE" />
          <span
            className={`network-page__copy-label ${
              copied ? 'network-page__copy-label-visible' : ''
            }`}
          >
            Copied
            <ToolTipIcon width="6.25rem" height="6.25rem" />
          </span>
        </NetworkActionButton>
        {isOwner && user && (
          <div className="network-page__toggle flex-align-center">
            <span className="network-page__toggle-label">
              {isPublic ? 'Public' : 'Private'}
            </span>
            <ToggleSwitch isToggled={!isPublic} onToggle={handleIsPublic} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkFooter;
