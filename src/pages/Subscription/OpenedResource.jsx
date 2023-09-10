import { useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import CancelModal from './CancelModal';
import InviteMemberModal from './InviteMemberModal';
import OpenedResourceCard from './OpenedResourceCard';
import OpenedResourceInfo from './OpenedResourceInfo';
import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
import { ReactComponent as TeamsIcon } from '../../assets/img/icons/teams.svg';
import placeholderImage from '../../assets/img/noname.svg';
import Popup from '../../components/StyledAlert/Popup';
import {
  useGetScheduledSubscriptionQuery,
  useGetSubscriptionQuery,
  useModifySubscriptionMutation,
  usePostProrationsAmountMutation,
} from '../../redux/subscriptions/subscriptionsApiSlice';
import {
  useGetTeamQuery,
  useAddMemberMutation,
  useDeleteMemberMutation,
} from '../../redux/teams/teamsApiSlice';
import { selectUser } from '../../redux/user/userSlice';
import { GreenButton } from '../../styles/muiComponentsStyles';
import ProfileWrapper from '../Profile/ProfileWrapper';

import './openedResource.scss';

const OpenedResource = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openDeleteMemberModal, setOpenDeleteMemberModal] = useState(false);
  const [openCancelSubscription, setOpenCancelSubscription] = useState(false);
  const [alertTxt, setAlertTxt] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const params = useParams();
  const currentUser = useSelector(selectUser);

  //api
  const scheduledSubscriptionResponse = useGetScheduledSubscriptionQuery();
  const subscriptionResponse = useGetSubscriptionQuery();
  const [addMember, addMemberResponse] = useAddMemberMutation();
  const [modifySubscription, modifySubscriptionResponse] =
    useModifySubscriptionMutation();
  const [postProrationsAmount, postProrationsAmountResponse] =
    usePostProrationsAmountMutation();
  const teamResponse = useGetTeamQuery(params?.id);
  const scheduledSubscription = scheduledSubscriptionResponse?.data;
  const subscription = subscriptionResponse?.data;
  const currentScheduledResource =
    scheduledSubscriptionResponse?.data?.current_resources?.find(
      (resource) => resource?.id === params?.id,
    );
  const currentResource = subscriptionResponse?.data?.resources?.find(
    (resource) => resource?.id === params?.id,
  );
  const isOwner = currentUser?.id === subscription?.user;

  console.log('scheduledSubscription', scheduledSubscription);
  console.log('addMemberResponse', addMemberResponse);
  console.log('modifySubscriptionResponse', modifySubscriptionResponse);
  console.log('postProrationsAmountResponse', postProrationsAmountResponse);

  const handleCloseCancelSubscription = () => setOpenCancelSubscription(false);

  const handleOpenInviteModal = () => setOpenInviteModal(true);
  const handleCloseInviteModal = () => setOpenInviteModal(false);
  const handleOpenCancelSubscription = () => setOpenCancelSubscription(true);
  const handleOpenDeleteMemberModal = () => setOpenDeleteMemberModal(true);
  const handleCloseDeleteMemberModal = () => setOpenDeleteMemberModal(false);
  const handleAlertClose = () => setOpenAlert(false);

  const handleInviteMember = async (data) => {
    try {
      await addMember({
        id: params?.id,
        data: {
          resource_id: currentScheduledResource?.id,
        },
      }).unwrap();
    } catch (error) {
      setAlertTxt(error?.data?.detail);
      setOpenAlert(true);
    }
  };

  const handleCancelSubscription = async () => {
    const resourceQuantityPairs = scheduledSubscription?.current_resources?.map(
      (resource) => ({
        resource_id: resource.id,
        quantity: resource.seats_quantity,
      }),
    );
    const isAcademic =
      subscriptionResponse?.licence_type === 'commercial' ? false : true;
    try {
      const postProrationsAmountResult = await postProrationsAmount({
        resource_quantity_pairs: resourceQuantityPairs,
        subscription_plan: subscriptionResponse?.plan_type,
        is_academic: isAcademic,
        proration_date: null,
      }).unwrap();
      await modifySubscription({
        resource_quantity_pairs: resourceQuantityPairs,
        subscription_plan: subscriptionResponse?.plan_type,
        is_academic: isAcademic,
        proration_date: postProrationsAmountResult?.subscription_proration_date,
      }).unwrap();
    } catch (error) {
      setAlertTxt(error?.data?.error);
      setOpenAlert(true);
    }
  };

  return (
    <ProfileWrapper>
      <div className="resource-subscription">
        {scheduledSubscriptionResponse.isLoading ||
        subscriptionResponse.isLoading ? (
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
        ) : (
          <div className="resource-subscription__container">
            <div className="resource-subscription__header">
              <div className="page-location">
                <p className="page-location__previous">Subscription</p>
                <span>{'>'}</span>
                <p className="page-location__current">Cereals Premium</p>
              </div>
              <Link
                to={'/subscription'}
                className="flex-align-center link-hover resource-subscription-card__back-link"
              >
                <ArrowLeft fill="#121212" width="16" height="16" /> Back to
                subscription
              </Link>
            </div>

            <OpenedResourceCard
              name={currentScheduledResource?.source_name}
              image={currentScheduledResource?.image}
              endDate={scheduledSubscription?.next_billing_date}
              handleOpenCancelSubscription={handleOpenCancelSubscription}
            />
            <div className="resource-subscription__main">
              <div className="resource-subscription__left">
                <div className="resource-subscription__seats">
                  <div className="profile-subscription-resource-seats__line">
                    <div
                      className="profile-subscription-resource-seats__indicator"
                      style={{
                        width: `calc(${currentScheduledResource?.used_seats} / ${currentScheduledResource?.seats_quantity} * 100%)`,
                      }}
                    ></div>
                  </div>
                  <div className="profile-subscription-resource-seats__bottom">
                    <div className="profile-subscription-resource-seats__bottom-left">
                      <TeamsIcon /> Seats
                    </div>
                    <div className="profile-subscription-resource-seats__count">
                      {currentScheduledResource?.used_seats} /{' '}
                      {currentScheduledResource?.seats_quantity}
                    </div>
                  </div>
                </div>
                <div className="resource-subscription-members">
                  <h2 className="txt-small">Members</h2>
                  <div className="resource-subscription-members__list">
                    <div className="resource-subscription-member">
                      <div className="flex-align-center">
                        <img
                          src={
                            currentUser?.image
                              ? `data:image/png;base64, ${currentUser.image}`
                              : placeholderImage
                          }
                          alt=""
                        />
                        <p className="resource-subscription-member__name">
                          {currentUser?.first_name} {currentUser?.last_name}{' '}
                          (You)
                        </p>
                      </div>
                      <p className="txt-green">Owner</p>
                    </div>
                    {/* <div className="resource-subscription-member flex-space">
                  <div className="flex-align-center">
                    <img src={placeholderImg} alt="" />
                    <p className="resource-subscription-member__name">
                      Keywan Hassani-Pak (You)
                    </p>
                  </div>
                  {isOwner && (
                    <IconButton
                      sx={{
                        backgroundColor: 'rgba(189, 197, 206, 0.15)',
                      }}
                      onClick={handleOpenDeleteMemberModal}
                    >
                      <DeleteIcon fill="#121212" />
                    </IconButton>
                  )}
                </div> */}
                  </div>
                </div>
                {isOwner && (
                  <GreenButton
                    variant="contained"
                    onClick={handleOpenInviteModal}
                  >
                    Invite members
                  </GreenButton>
                )}
              </div>
              <OpenedResourceInfo
                name={currentScheduledResource?.source_name}
                networks={currentScheduledResource?.connected_networks_qty}
                licenceType={scheduledSubscription?.licence_type}
                reservedSeats={currentScheduledResource?.seats_quantity}
                usedSeats={currentScheduledResource?.used_seats}
                plan={scheduledSubscription?.plan_type}
                nextAmount={currentScheduledResource?.amount}
                price={currentScheduledResource?.price}
                nextBillingDate={scheduledSubscription?.next_billing_date}
              />
            </div>
          </div>
        )}

        <InviteMemberModal
          open={openInviteModal}
          handleClose={handleCloseInviteModal}
          usedSeats={currentScheduledResource?.used_seats}
          seatsCount={currentScheduledResource?.seats_quantity}
          user={currentUser}
          handleInviteMember={handleInviteMember}
        />
        <CancelModal
          openCancelSubscription={openCancelSubscription}
          handleCloseCancelSubscription={handleCloseCancelSubscription}
          title={
            'Are you sure you want to cancel subscription for that resource ?'
          }
          subtitle={
            'Your subscription will be active for the remaining time. After that, you’ll lose access to all the benefits.'
          }
          btnText={'Cancel Subscription'}
          cancelSubscription={handleCancelSubscription}
        />
        <CancelModal
          openCancelSubscription={openDeleteMemberModal}
          handleCloseCancelSubscription={handleCloseDeleteMemberModal}
          title={'Are you sure you want to delete user from resource?'}
          btnText={'Delete user'}
        />
        <Popup
          alertSeverity={'error'}
          alertText={alertTxt}
          openAlert={openAlert}
          handleAlertClose={handleAlertClose}
        />
      </div>
    </ProfileWrapper>
  );
};

export default OpenedResource;
