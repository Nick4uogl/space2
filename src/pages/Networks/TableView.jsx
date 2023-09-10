import { DateTime } from 'luxon';

import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete.svg';
import { ReactComponent as ShareIcon } from '../../assets/img/icons/share.svg';
import noImageSvg from '../../assets/img/noname.svg';
import { ReactComponent as ToolTipIcon } from '../../assets/img/toolTip.svg';

const TableView = ({
  sharedList,
  checkAll,
  selectedNetworkIDs,
  networks,
  checkedAll,
  networkShares,
  updateSelectedNetwork,
  deleteNetworkAction,
  setShareNetworkId,
  setOpenSharingModal,
  user,
}) => {
  return (
    <div className="networks-table">
      <table className="table network-table">
        <thead>
          <tr>
            {!sharedList && (
              <th className="network-table__check-head">
                <label className="container">
                  <input
                    type="checkbox"
                    onChange={checkAll}
                    checked={
                      networks?.length == Array.from(selectedNetworkIDs)?.length
                        ? true
                        : checkedAll
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
            )}

            <th className="network-table__resource-name-head">Resource name</th>
            <th className="network-table__nodes-head">Nodes</th>
            <th className="network-table__edges-head">Edges</th>
            <th className="network-table__date-head">Date Modified</th>
            <th className="network-table__resource-head">Resource</th>
            <th className="network-table__access-head">Access</th>
            <th className="network-table__shared-head">Shared with</th>
            <th className="network-table__actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {networks?.map((network) => {
            const filteredNetworkShares = networkShares?.filter(
              (share) => share.network === network?.id,
            );
            return (
              <tr key={network?.id + 'table'}>
                {!sharedList && (
                  <td>
                    <label className="container">
                      <input
                        type="checkbox"
                        onChange={() => updateSelectedNetwork(network.id)}
                        checked={
                          checkedAll
                            ? true
                            : selectedNetworkIDs.includes(network?.id)
                        }
                        className="mx-2"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                )}

                <td>{network.name}</td>
                <td>{network.num_nodes}</td>
                <td>{network.num_edges}</td>
                <td>
                  {DateTime.fromISO(network.date_modified)
                    .toLocal()
                    .toFormat('dd-MM-yyyy HH:mm')}
                </td>
                <td>{network.species_name}</td>
                <td>
                  {network.is_public ? (
                    <span style={{ color: '#51CE7B' }}>Public</span>
                  ) : (
                    <span style={{ color: '#F34A4A' }}>Private</span>
                  )}
                </td>
                <td>
                  <div className="network__participants">
                    {filteredNetworkShares?.map((share, i) => (
                      <div
                        key={share?.network + 'tableshare'}
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
                        <div className="network__participant-name">
                          {share.user?.full_name}
                          <ToolTipIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  {user?.id === network?.owner?.id && (
                    <>
                      <button onClick={() => deleteNetworkAction([network.id])}>
                        <DeleteIcon fill="#6F7F8F" />
                      </button>
                      <button
                        onClick={() => {
                          setShareNetworkId(network?.id);
                          setOpenSharingModal(true);
                        }}
                      >
                        <ShareIcon fill="#6F7F8F" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
