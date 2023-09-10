import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete.svg';
import { ReactComponent as ShareIcon } from '../../assets/img/icons/share.svg';
import noImageSvg from '../../assets/img/noname.svg';
import { ReactComponent as ToolTipIcon } from '../../assets/img/toolTip.svg';
import './gridView.scss';

const GridView = ({
  currentNetworks,
  networkShares,
  selectedNetworkIDs,
  userId,
  updateSelectedNetwork,
  checkedAll,
  deleteNetworkAction,
  setShareNetworkId,
  setOpenSharingModal,
  sharedList,
  isRecycleBin,
  updateSelectedNetowrksToDelete,
  selectedNetworksToDelete,
}) => {
  return (
    <div className="networks-page__networks">
      {currentNetworks?.map((network) => {
        const filteredNetworkShares = networkShares?.filter(
          (share) => share.network === network?.id,
        );
        return (
          <div
            key={network.id + 'grid'}
            className="network recycle-bin-network"
            onClick={(ev) => {
              if (isRecycleBin) {
                updateSelectedNetowrksToDelete(ev, network?.id);
              }
            }}
          >
            <div
              className={`network__container ${
                selectedNetworksToDelete.includes(network?.id) ? 'selected' : ''
              }`}
            >
              <div className="network__image">
                <img src={`data:image/png;base64, ${network.image}`} alt="" />
                {isRecycleBin ? (
                  <div className="recycle-bin-network__top">
                    <div className="recycle-bin-network__days-left">
                      {network?.days_to_permanent_deletion} days
                    </div>
                    <label className="recycle-bin-network__checkbox nobg-check">
                      <input
                        type="checkbox"
                        onChange={(ev) => {
                          updateSelectedNetowrksToDelete(ev, network?.id);
                        }}
                        checked={selectedNetworksToDelete.includes(network?.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                ) : (
                  <>
                    <div
                      className={`network__hover ${
                        selectedNetworkIDs.includes(network?.id)
                          ? 'network-checked'
                          : ''
                      }`}
                    >
                      {userId === network.owner.id && (
                        <div className="network__hover-top">
                          <label className="nobg-check">
                            <input
                              type="checkbox"
                              onChange={() =>
                                updateSelectedNetwork(network?.id)
                              }
                              checked={
                                checkedAll
                                  ? true
                                  : selectedNetworkIDs.includes(network?.id)
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                          <div className="network-hover-actions">
                            <button
                              className="network-hover-actions__btn network-hover-actions__share"
                              onClick={() => {
                                setShareNetworkId(network?.id);
                                setOpenSharingModal(true);
                              }}
                            >
                              <ShareIcon fill="#fff" />
                              <div className="network-hover-actions__tooltip network-hover-actions__share-tooltip">
                                Share
                              </div>
                            </button>
                            <button
                              className="network-hover-actions__btn network-hover-actions__delete"
                              onClick={() => deleteNetworkAction([network?.id])}
                            >
                              <DeleteIcon fill="#fff" />
                              <div className="network-hover-actions__tooltip network-hover-actions__delete-tooltip">
                                Send to recycle bin
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                      <Link
                        to={`/network/${
                          sharedList
                            ? `${network?.id}?shared=true`
                            : network?.id
                        }`}
                        className="network__hover-link"
                      >
                        View Network
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className="network__info">
                <h2 className="network__title">{network.name}</h2>
                <div className="network__info-bottom">
                  <p className="network__name">{network.species_name}</p>
                  <div className="network__date">
                    {DateTime.fromISO(network.date_modified).toFormat(
                      'MMMM dd, yyyy',
                    )}
                  </div>
                </div>
              </div>
              <div className="network__bottom">
                <div
                  className={`network__owner ${
                    filteredNetworkShares?.length !== 0 &&
                    !sharedList &&
                    'network__owner--border'
                  }`}
                >
                  <img
                    src={
                      network.owner?.image
                        ? `data:image/png;base64, ${network.owner.image}`
                        : noImageSvg
                    }
                    alt={`${network.owner?.username} avatar`}
                  />
                  {sharedList && (
                    <div className="network__share-owner">
                      By{' '}
                      <span>
                        {network.owner?.first_name} {network.owner?.last_name}
                      </span>
                    </div>
                  )}
                </div>
                {!sharedList && (
                  <div className="network__participants">
                    {filteredNetworkShares?.map((share, i) => {
                      return (
                        <div
                          key={share.user?.id}
                          className="network__participant"
                        >
                          <img
                            src={
                              share.user?.image
                                ? `data:image/png;base64, ${share.user?.image}`
                                : noImageSvg
                            }
                            style={{
                              zIndex: filteredNetworkShares?.length - i,
                              right: 5 * i,
                            }}
                            alt={`${share.user?.image} avatar`}
                          />
                          <div
                            className="network__participant-name"
                            style={{ left: `calc(50% - (5px * ${i}))` }}
                          >
                            {share.user?.full_name}
                            <ToolTipIcon />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {network.is_public && (
                  <div className="network__tag">Public</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
