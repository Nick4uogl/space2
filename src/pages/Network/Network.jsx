import { useState, useEffect, lazy, Suspense, useCallback } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import EditModal from './EditModal';
import NetworkActions from './NetworkActions';
import NetworkFooter from './NetworkFooter';
import NetworkInfo from './NetworkInfo';
import NetworkLeft from './NetworkLeft';
import Header from '../../components/Header/Header';
import SharingModal from '../../components/SharingModal/SharingModal';
import Popup from '../../components/StyledAlert/Popup';
import {
  CAN_VIEW,
  CAN_CLONE,
  CAN_CLONE_AND_SHARE,
} from '../../constants/sharePermissions';
import {
  useGetNetworkSharesQuery,
  useDeleteNetworkMutation,
  useCloneNetworkMutation,
  useEditIsPublicMutation,
  useEditNetworkDescriptionMutation,
  useEditNetworkNameMutation,
  useGetNetworkWithPrevAndNextQuery,
  usePatchNetworkMutation,
} from '../../redux/networks/networksApiSlice';
import { changeIsPublic } from '../../redux/networks/networksSlice';
import { selectUser } from '../../redux/user/userSlice';
import NotFound from '../NotFound/NotFound';

import './network.scss';

const MapsApp = lazy(() => import('micro1/KnetMapsApp'));

function Network() {
  const [mode, setMode] = useState('view');
  const [openSharingModal, setOpenSharingModal] = useState(false);
  const [isInShares, setIsInShares] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [copied, setCopied] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditDescription, setOpenEditDescription] = useState(false);
  const [alertText, setAlertText] = useState('');
  const params = useParams();
  const networkResponse = useGetNetworkWithPrevAndNextQuery(params?.id);
  const currentNetwork = networkResponse?.data?.current_network;
  const [networkName, setNetworkName] = useState(currentNetwork?.name ?? '');
  const [networkDescription, setNetworkDescription] = useState(
    currentNetwork?.description ?? '',
  );
  const [isPublic, setIsPublic] = useState(currentNetwork?.isPublic);
  const [userPermission, setUserPermission] = useState(CAN_VIEW);

  const user = useSelector(selectUser);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSharedNetwork = queryParams.get('shared');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // api
  const networkSharesResponse = useGetNetworkSharesQuery(params?.id);
  const [deleteNetwork] = useDeleteNetworkMutation();
  const [cloneNetwork] = useCloneNetworkMutation();
  const [editNetworkDescription] = useEditNetworkDescriptionMutation();
  const [editNetworkName] = useEditNetworkNameMutation();
  const [editIsPublic] = useEditIsPublicMutation();
  const [editNetwork] = usePatchNetworkMutation();

  const networkShares = networkSharesResponse?.data;
  const overallPermission = currentNetwork?.overall_permission;
  const nextNetworkId = networkResponse?.data?.next_network_id;
  const previousNetworkId = networkResponse?.data?.previous_network_id;
  const isOwner = user?.id === currentNetwork?.owner?.id;

  const handleCloneNetwork = async () => {
    try {
      const response = await cloneNetwork(params?.id);
      if (response?.error?.data) {
        if (response?.error?.status === 401) {
          setAlertText('Please register or login first');
        } else {
          setAlertText(response.error.data?.error ?? 'Failed to clone');
        }
        setOpenAlert(true);
        setAlertSeverity('error');
      } else {
        navigate(`/network/${response?.data?.id}`);
      }
    } catch (error) {
      setOpenAlert(true);
      setAlertText('Failed to clone');
      setAlertSeverity('error');
    }
  };

  const handleIsPublic = async () => {
    try {
      await editIsPublic({
        data: { is_public: !isPublic },
        id: params?.id,
      }).unwrap();
      setIsPublic(!isPublic);
      dispatch(changeIsPublic({ id: params?.id, value: !isPublic }));
    } catch (error) {
      console.log('error', error);
      setOpenAlert(true);
      setAlertText('Edit network error');
      setAlertSeverity('error');
    }
  };

  const handleCloseSharingModal = () => {
    setOpenSharingModal(false);
  };

  const handleDownload = (base64String, name) => {
    const linkSource = `data:image/png;base64, ${base64String}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  };

  const handleDelete = async () => {
    try {
      await deleteNetwork([params?.id]).unwrap();
      if (nextNetworkId) {
        navigate(`/network/${nextNetworkId}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      setOpenAlert(true);
      setAlertText('Deleting error');
      setAlertSeverity('error');
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleEditNetworkName = async (name) => {
    if (name !== networkName && name) {
      try {
        await editNetworkName({
          id: params?.id,
          data: { name: name },
        }).unwrap();
        setOpenAlert(true);
        setAlertText('Edited');
        setAlertSeverity('success');
      } catch (error) {
        setOpenAlert(true);
        setAlertText('Edit error');
        setAlertSeverity('error');
      }
      setNetworkName(name);
    }
    setOpenEditName(false);
  };

  const handleEditNetworkDescription = async (description) => {
    if (description !== networkDescription && description) {
      try {
        await editNetworkDescription({
          id: params?.id,
          body: { description: description },
        }).unwrap();
        setOpenAlert(true);
        setAlertText('Edited');
        setAlertSeverity('success');
      } catch (error) {
        setOpenAlert(true);
        setAlertText('Edit error');
        setAlertSeverity('error');
      }
      setNetworkDescription(description);
    }
    setOpenEditDescription(false);
  };

  const handleExploreNetworkClick = () => setMode('edit');
  const handleCloseClick = () => {
    // setMode('view');
    window.location.reload();
  };

  const handleSaveGraph = useCallback(
    async (data, imgData) => {
      if (!data || !currentNetwork) return;
      try {
        await editNetwork({
          id: params?.id,
          data: {
            graph: {
              ...currentNetwork.graph,
              graphJSON: data,
            },
            ...imgData && { image: imgData }
          },
        }).unwrap();
        setOpenAlert(true);
        setAlertText('Graph changes saved');
        setAlertSeverity('success');
      } catch (e) {
        console.log('Error happened saving graph', e);
        setOpenAlert(true);
        setAlertText('Got error saving graph changes');
        setAlertSeverity('error');
      }
    },
    [editNetwork, params?.id, currentNetwork],
  );

  useEffect(() => {
    const determineUserEditRights = () => {
      networkShares?.[0]?.users?.map((share) => {
        if (share.user?.id === user?.id) {
          setUserPermission(share?.permission);
          setIsInShares(true);
        }
      });
    };
    determineUserEditRights();
  }, [params?.id, networkSharesResponse?.isLoading, user, networkShares]);

  useEffect(() => {
    setNetworkName(currentNetwork?.name);
    setNetworkDescription(currentNetwork?.description);
    setIsPublic(currentNetwork?.is_public);
  }, [currentNetwork]);

  const isClonePermitted =
    (isOwner && user) ||
    userPermission === CAN_CLONE_AND_SHARE ||
    userPermission === CAN_CLONE ||
    ((overallPermission === CAN_CLONE_AND_SHARE ||
      overallPermission === CAN_CLONE) &&
      (!user || (user && !isInShares)));

  const isSharingPermitted =
    (isOwner && user) ||
    userPermission === CAN_CLONE_AND_SHARE ||
    (overallPermission === CAN_CLONE_AND_SHARE &&
      (!user || (user && !isInShares)));

  if (
    !networkResponse?.data &&
    !networkResponse.isLoading &&
    networkResponse.isUninitialized &&
    !user
  ) {
    return <NotFound message="Sorry, we can`t find this network" />;
  }

  console.log({ currentNetwork });
  console.log(networkShares, networkShares);

  return (
    <div className="network-page">
      <Header />
      {networkResponse?.isUninitialized || networkResponse?.isLoading ? (
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
      ) : networkResponse?.error ? (
        <div className="network-page__error error">
          {networkResponse?.error?.data?.error
            ? networkResponse?.error?.data?.error
            : 'Failed to fetch network'}
        </div>
      ) : mode === 'view' ? (
        <div className="network-page__container">
          <div className="network-page__wrapper">
            <NetworkLeft
              currentNetwork={currentNetwork}
              isSharedNetwork={isSharedNetwork}
              nextNetworkId={nextNetworkId}
              previousNetworkId={previousNetworkId}
            ></NetworkLeft>
            <div className="network-page__right">
              <NetworkActions
                isOwner={isOwner}
                handleExploreNetworkClick={handleExploreNetworkClick}
                user={user}
                isClonePermitted={isClonePermitted}
                handleDownload={handleDownload}
                setOpenSharingModal={setOpenSharingModal}
                handleCloneNetwork={handleCloneNetwork}
                currentNetwork={currentNetwork}
                isSharingPermitted={isSharingPermitted}
                handleDelete={handleDelete}
              />
              <NetworkInfo
                isOwner={isOwner}
                networkName={networkName}
                setOpenEditName={setOpenEditName}
                setOpenEditDescription={setOpenEditDescription}
                networkDescription={networkDescription}
                currentNetwork={currentNetwork}
              />
              <NetworkFooter
                currentNetwork={currentNetwork}
                networkShares={networkShares}
                user={user}
                setCopied={setCopied}
                copied={copied}
                isOwner={isOwner}
                isPublic={isPublic}
                handleIsPublic={handleIsPublic}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="network-page__container-edit">
          <Suspense fallback={<div>loading maps</div>}>
            <MapsApp
              embedded
              onCloseEmbeddedAppWindow={handleCloseClick}
              data={{ graph: currentNetwork?.graph }}
              handleSaveGraph={handleSaveGraph}
            />
          </Suspense>
        </div>
      )}

      <Popup
        handleAlertClose={handleAlertClose}
        alertSeverity={alertSeverity}
        openAlert={openAlert}
        alertText={alertText}
      />
      <SharingModal
        networkId={params?.id}
        open={openSharingModal}
        handleClose={handleCloseSharingModal}
        refetchNetwork={networkResponse.refetch}
        currentNetwork={currentNetwork}
      />
      <EditModal
        open={openEditName}
        value={networkName}
        title={'Name'}
        handleClose={handleEditNetworkName}
      />
      <EditModal
        open={openEditDescription}
        value={networkDescription}
        title={'Description'}
        handleClose={handleEditNetworkDescription}
      />
    </div>
  );
}

export default Network;
