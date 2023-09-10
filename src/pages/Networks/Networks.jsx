import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import GridView from './GridView';
import NetworksActions from './NetworksActions';
import TableView from './TableView';
import { ReactComponent as ArrowLeftIcon } from '../../assets/img/icons/arrowLeft.svg';
import Header from '../../components/Header/Header';
import SharingModal from '../../components/SharingModal/SharingModal';
import Popup from '../../components/StyledAlert/Popup';
import {
  useDeleteNetworkMutation,
  useGetNetworkSharesQuery,
  useRemoveNetworkMutation,
  useRestoreNetworksMutation,
} from '../../redux/networks/networksApiSlice';
import { selectUser } from '../../redux/user/userSlice';
import './networks.scss';

function Networks(props) {
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNetworkIDs, setSelectedNetworkIDs] = useState([]);
  const [selectedNetworksToDelete, setSelectedNetworksToDelete] = useState([]);
  const [shareNetworkId, setShareNetworkId] = useState('');
  const [checkedAll, setCheckedAll] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [openSharingModal, setOpenSharingModal] = useState(false);
  const user = useSelector(selectUser);
  const networksResponse = props.networksResponse;
  const networksSharesResponse = useGetNetworkSharesQuery();
  const networkShares = networksSharesResponse?.data;
  const networks = props.networks;
  const [deleteNetwork] = useDeleteNetworkMutation();
  const [removeNetwork] = useRemoveNetworkMutation();
  const [restoreNetworks] = useRestoreNetworksMutation();
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  //pagination
  const totalPages = Math.ceil(networks?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNetworks = networks?.slice(indexOfFirstItem, indexOfLastItem);

  const handleCloseSharingModal = () => {
    setOpenSharingModal(false);
  };

  function getItemsPerPage() {
    const screenWidth = window.innerWidth;
    const toWidthQuantityNetworksPairs = {
      10000: 14,
      4000: 12,
      3000: 10,
      2500: 8,
      1280: 6,
    };
    for (const key in toWidthQuantityNetworksPairs) {
      if (screenWidth < key) {
        console.log(toWidthQuantityNetworksPairs[key]);
        return toWidthQuantityNetworksPairs[key];
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateSelectedNetwork = (id) => {
    let updatedArray = [];
    if (selectedNetworkIDs.includes(id)) {
      updatedArray = selectedNetworkIDs.filter((el) => el !== id);
    } else {
      updatedArray = [...selectedNetworkIDs, id];
    }
    setSelectedNetworkIDs(updatedArray);
  };

  const updateSelectedNetowrksToDelete = (e, id) => {
    let updatedArray = [];
    if (selectedNetworksToDelete.includes(id)) {
      updatedArray = selectedNetworksToDelete.filter((el) => el !== id);
    } else {
      updatedArray = [...selectedNetworksToDelete, id];
    }
    setSelectedNetworksToDelete(updatedArray);
  };

  const checkAll = (e) => {
    let newSelectedNetworkIDs = new Set();
    networks?.map((network) => {
      user?.id === network?.owner?.id && e.target.checked
        ? newSelectedNetworkIDs.add(network?.id)
        : newSelectedNetworkIDs.delete(network?.id);
    });
    setSelectedNetworkIDs(newSelectedNetworkIDs);
    setCheckedAll(e.target.checked);
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleIsGrid = (value) => {
    setIsGrid(value);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const deleteNetworkAction = async (networks) => {
    try {
      await deleteNetwork(networks).unwrap();
      setOpenAlert(true);
      setAlertText('Sent to recycle bin');
      setAlertSeverity('success');
      networksResponse?.refetch();
      setSelectedNetworkIDs([]);
    } catch (err) {
      setOpenAlert(true);
      setAlertText('Delete error');
      setAlertSeverity('error');
    }
  };

  const removeNetworks = async (networksIds, deleteAll) => {
    try {
      if (deleteAll) {
        await removeNetwork(networks?.map((network) => network?.id)).unwrap();
      } else {
        await removeNetwork(networksIds).unwrap();
      }
      networksResponse?.refetch();
      setSelectedNetworksToDelete([]);
      setOpenAlert(true);
      setAlertText('Permanently deleted');
      setAlertSeverity('success');
    } catch (err) {
      setOpenAlert(true);
      setAlertText('Delete error');
      setAlertSeverity('error');
    }
  };

  const handleRestoreNetworks = async (networksIds, deleteAll) => {
    try {
      if (deleteAll) {
        await restoreNetworks(networks?.map((network) => network?.id)).unwrap();
      } else {
        await restoreNetworks(networksIds).unwrap();
      }
      networksResponse?.refetch();
      setSelectedNetworksToDelete([]);
      setOpenAlert(true);
      setAlertText('Successfully restored');
      setAlertSeverity('success');
    } catch (err) {
      setOpenAlert(true);
      setAlertText('Restore error');
      setAlertSeverity('error');
    }
  };

  useEffect(() => {
    if (networksResponse?.error) {
      setOpenAlert(true);
      setAlertText('Failed to fetch networks');
      setAlertSeverity('error');
    }
  }, [networksResponse?.error]);

  return (
    <div className="networks-page">
      <Header />
      <div
        className={`networks-page__container ${
          totalPages <= 1 ? 'without-pagination' : ''
        }`}
      >
        <NetworksActions
          isRecycleBin={props?.recycleBin}
          isGrid={isGrid}
          handleIsGrid={handleIsGrid}
          selectedNetworkIDs={selectedNetworkIDs}
          removeNetworks={removeNetworks}
          deleteNetworks={deleteNetworkAction}
          selectedNetworksToDelete={selectedNetworksToDelete}
          restoreNetworks={handleRestoreNetworks}
        />
        {props?.recycleBin && !networks && !networksResponse?.isLoading ? (
          <div className="recycle-bin__empty">Your recycle bin is empty</div>
        ) : (
          !networksResponse?.isLoading &&
          (isGrid ? (
            <GridView
              props={props}
              selectedNetworkIDs={selectedNetworkIDs}
              selectedNetworksToDelete={selectedNetworksToDelete}
              setShareNetworkId={setShareNetworkId}
              checkedAll={checkedAll}
              setOpenSharingModal={setOpenSharingModal}
              userId={user?.id}
              networkShares={networkShares}
              currentNetworks={currentNetworks}
              updateSelectedNetwork={updateSelectedNetwork}
              updateSelectedNetowrksToDelete={updateSelectedNetowrksToDelete}
              deleteNetworkAction={deleteNetworkAction}
              isRecycleBin={props?.recycleBin}
              sharedList={props.sharedList}
            />
          ) : (
            <TableView
              sharedList={props.sharedList}
              selectedNetworkIDs={selectedNetworkIDs}
              setShareNetworkId={setShareNetworkId}
              checkedAll={checkedAll}
              setOpenSharingModal={setOpenSharingModal}
              user={user}
              networkShares={networkShares}
              networks={networks}
              updateSelectedNetwork={updateSelectedNetwork}
              checkAll={checkAll}
              deleteNetworkAction={deleteNetworkAction}
              isRecycleBin={props?.recycleBin}
            />
          ))
        )}

        {isGrid && !networksResponse?.isLoading && totalPages > 1 && (
          <ReactPaginate
            onPageChange={handlePageChange}
            pageRangeDisplayed={4}
            pageCount={totalPages}
            renderOnZeroPageCount={false}
            breakLabel="..."
            initialPage={currentPage - 1}
            nextLabel={
              <>
                Next
                <ArrowLeftIcon fill="#121212" />
              </>
            }
            className="networks-page__navigation"
            previousLabel={
              <>
                <ArrowLeftIcon fill="#121212" />
                Prev
              </>
            }
            pageLinkClassName="networks-page__navigation-item"
            previousLinkClassName="networks-page__navigation-prev"
            nextLinkClassName="networks-page__navigation-next"
            activeLinkClassName="networks-page__navigation-active"
          />
        )}
      </div>
      {networksResponse?.isLoading && (
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
      )}
      <SharingModal
        networkId={shareNetworkId}
        open={openSharingModal}
        handleClose={handleCloseSharingModal}
        refetchSharing={networksSharesResponse.refetch}
        refetchNetworkShares={networksSharesResponse.refetch}
      />
      <Popup
        handleAlertClose={handleAlertClose}
        alertSeverity={alertSeverity}
        openAlert={openAlert}
        alertText={alertText}
      />
    </div>
  );
}

export default Networks;
