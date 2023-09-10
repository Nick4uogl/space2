import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../../assets/img/icons/next.svg';
const SubscriptionTabs = ({
  handleOpenCancelSubscription,
  handleOpenInvoices,
  handleRenewSubscription,
  subscriptionCanceled,
}) => {
  return (
    <div className="profile-subscription__tabs">
      <Link to={'/subscription/manage-subscription'}>
        <Button className="txt-small flex-space">
          Manage Subscription <ArrowRight stroke="#121212" />
        </Button>
      </Link>
      {subscriptionCanceled ? (
        <Button
          className="txt-small flex-space"
          onClick={handleRenewSubscription}
        >
          Renew Subscription <ArrowRight stroke="#121212" />
        </Button>
      ) : (
        <Button
          className="txt-small flex-space"
          onClick={() => handleOpenCancelSubscription(true)}
        >
          Cancel Subscription <ArrowRight stroke="#121212" />
        </Button>
      )}
      <Button
        className="txt-small flex-space"
        onClick={() => handleOpenInvoices(true)}
      >
        Invoices / Quotes <ArrowRight stroke="#121212" />
      </Button>
      <Button className="txt-small flex-space">
        Payment Method <ArrowRight stroke="#121212" />
      </Button>
    </div>
  );
};

export default SubscriptionTabs;
