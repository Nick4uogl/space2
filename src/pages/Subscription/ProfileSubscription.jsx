import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import CancelModal from './CancelModal';
import InvoicesModal from './InvoicesModal';
import NextDateSubscriptionAlert from './NextDateSubscriptionAlert';
import ProfileSubscriptionInfo from './ProfileSubscriptionInfo';
import RenewSubscriptionAlert from './RenewSubscriptionAlert';
import ResourceCardSubscription from './ResourceCardSubscription';
import SubscriptionTabs from './SubscriptionTabs';
import { ReactComponent as NextIcon } from '../../assets/img/icons/next.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/next.svg';
import { ReactComponent as QuoteIcon } from '../../assets/img/icons/quote.svg';
import Popup from '../../components/StyledAlert/Popup';
import {
  useGetScheduledSubscriptionQuery,
  useCancelSubscriptionMutation,
  useRenewSubscriptionMutation,
  useGetSubscriptionQuery,
  usePauseSubscriptionMutation,
} from '../../redux/subscriptions/subscriptionsApiSlice';
import ProfileWrapper from '../Profile/ProfileWrapper';

import './profileSubscription.scss';

const ProfileSubscription = () => {
  const [openInvoices, setOpenInvoices] = useState(false);
  const [openCancelSubscription, setOpenCancelSubscription] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  //api
  const scheduledSubscriptionResponse = useGetScheduledSubscriptionQuery();
  const [cancelSubscription, cancelSubscriptionResponse] =
    useCancelSubscriptionMutation();
  const [renewSubscription, renewSubscriptionResponse] =
    useRenewSubscriptionMutation();
  const [pauseSubscription, pauseSubscriptionResponse] =
    usePauseSubscriptionMutation();
  const subscriptionResponse = useGetSubscriptionQuery();
  const subscriptionCanceled = subscriptionResponse?.data?.canceled_at;
  const scheduledSubscription = scheduledSubscriptionResponse?.data;
  const scheduledSubscriptionResponseError =
    scheduledSubscriptionResponse?.error?.data;
  const currentResources =
    scheduledSubscriptionResponse?.data?.current_resources;

  console.log('sheduleResponse', scheduledSubscriptionResponse);
  console.log('subscriptionResponse', subscriptionResponse);
  console.log('renewSubscriptionResponse', renewSubscriptionResponse);

  const handleCloseInvoices = () => setOpenInvoices(false);
  const handleCloseCancelSubscription = () => setOpenCancelSubscription(false);
  const handleAlertClose = () => setOpenAlert(false);
  const handleOpenCancelSubscription = () => setOpenCancelSubscription(true);
  const handleOpenInvoices = () => setOpenInvoices(true);

  const handleCancelSubscription = async () => {
    try {
      await pauseSubscription().unwrap();
      setOpenCancelSubscription(false);
      subscriptionResponse.refetch();
      scheduledSubscriptionResponse.refetch();
    } catch (error) {
      setError(
        cancelSubscriptionResponse?.error?.data?.error ??
          'Failed to cancel subscription',
      );
      setOpenAlert(true);
    }
  };

  const handleRenewSubscription = async () => {
    try {
      await renewSubscription().unwrap();
      setOpenCancelSubscription(false);
      subscriptionResponse.refetch();
      scheduledSubscriptionResponse.refetch();
    } catch (error) {
      setOpenAlert(true);
      setError('Failed to renew subscription');
    }
  };

  const reservedSeats = currentResources?.reduce(
    (accumulator, currentResource) =>
      accumulator + currentResource?.seats_quantity,
    0,
  );
  const usedSeats = currentResources?.reduce(
    (accumulator, currentResource) => accumulator + currentResource?.used_seats,
    0,
  );

  useEffect(() => {
    if (scheduledSubscriptionResponseError) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [scheduledSubscriptionResponseError]);

  useEffect(() => {
    scheduledSubscriptionResponse?.refetch();
    subscriptionResponse?.refetch();
  }, []);

  return (
    <ProfileWrapper>
      <div className="profile-subscription">
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
          <>
            {isEmpty ? (
              <div className="profile-subscription-empty">
                <h2 className="profile-subscription__title">Subscription</h2>

                <p className="profile-subscription-empty__text">
                  The are no subscriptions yet. Go to{' '}
                  <Link to={'/resources'}>resources page</Link> to find right
                  resource for you.
                </p>
                <div className="profile-subscription-btns">
                  <Link
                    to={'/resources'}
                    className="profile-subscription-btns__resources"
                  >
                    Resources
                  </Link>
                  <Link
                    className="profile-subscription-btns__calculator"
                    to={'/pricing-calculator'}
                  >
                    Pricing calculator
                    <NextIcon width="13" height="13" />
                  </Link>
                </div>
                <div className="profile-subscription-empty__quotes profile-subscription-quotes">
                  <h2 className="profile-subscription-quotes__title">
                    Active Quotes
                  </h2>
                  <div className="profile-subscription-quotes__quote profile-subscription-quote">
                    <div className="profile-subscription-quote__left">
                      <QuoteIcon />
                      <div className="profile-subscription-quote__info">
                        <h2>Quote #1</h2>
                        <p>Expire: 07, May 2023</p>
                      </div>
                    </div>
                    <div className="profile-subscription-quote__link">
                      View Quote
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-subscription__container">
                <h1 className="heading-2 profile-subscription__header">
                  Subscription
                </h1>
                <div className="profile-subscription__top">
                  <SubscriptionTabs
                    handleOpenCancelSubscription={handleOpenCancelSubscription}
                    handleOpenInvoices={handleOpenInvoices}
                    handleRenewSubscription={handleRenewSubscription}
                    subscriptionCanceled={subscriptionCanceled}
                  />
                  <ProfileSubscriptionInfo
                    licenceType={scheduledSubscription?.license_type}
                    resourcesQuantity={currentResources?.length}
                    reservedSeats={reservedSeats}
                    usedSeats={usedSeats}
                    plan={scheduledSubscription?.plan_type}
                    nextAmount={
                      scheduledSubscription?.next_amount_with_discount
                    }
                    nextBillingDate={scheduledSubscription?.next_billing_date}
                  />
                </div>
                {subscriptionCanceled ? (
                  <RenewSubscriptionAlert
                    renewSubscription={handleRenewSubscription}
                    downgradeDate={scheduledSubscription?.next_billing_date}
                  />
                ) : (
                  <NextDateSubscriptionAlert
                    renewDate={scheduledSubscription?.next_billing_date}
                    price={scheduledSubscription?.next_amount_with_discount}
                  />
                )}

                <div className="profile-subscription-resources">
                  <div className="profile-subscription-resources__header flex-space">
                    <h2 className="heading-2">Subscribed Resources</h2>
                    <Link
                      to={'/resources'}
                      className="profile-subscription-resources__header-link flex-align-center txt-small"
                    >
                      All resources
                      <ArrowRight
                        stroke="#121212"
                        width="0.875rem"
                        height="0.875rem"
                      />
                    </Link>
                  </div>
                  <div className="profile-subscription-resources__list">
                    {currentResources?.map((resource) => (
                      <ResourceCardSubscription
                        key={resource?.id}
                        image={resource?.image}
                        seats={resource?.seats_quantity}
                        usedSeats={resource?.used_seats}
                        name={resource?.source_name}
                        id={resource?.id}
                        renewDate={scheduledSubscription?.next_billing_date}
                      />
                    ))}
                  </div>
                </div>
                <div className="profile-subscription__footer txt-small">
                  Have a qeustions? Please <Link to="">contact us</Link>.
                </div>
              </div>
            )}
          </>
        )}

        <InvoicesModal
          openInvoices={openInvoices}
          handleCloseInvoices={handleCloseInvoices}
        />
        <CancelModal
          openCancelSubscription={openCancelSubscription}
          handleCloseCancelSubscription={handleCloseCancelSubscription}
          cancelSubscription={handleCancelSubscription}
          title={'Are you sure you want to cancel subscription?'}
          subtitle={
            'Your subscription will be active for the remaining time. After that, you’ll lose access to all the benefits.'
          }
          btnText={'Cancel Subscription'}
        />
        <Popup
          openAlert={openAlert}
          alertText={error}
          alertSeverity={'error'}
          handleAlertClose={handleAlertClose}
        />
      </div>
    </ProfileWrapper>
  );
};

export default ProfileSubscription;
