import { Button } from '@mui/material';
import { DateTime } from 'luxon';

import { AlertIcon } from '../../components/Svgs/Svgs';

const RenewSubscriptionAlert = ({ renewSubscription, downgradeDate }) => {
  return (
    <div className="subscription-canceled-alert">
      <p className="subscription-canceled-alert__text">
        <AlertIcon
          circlefill="#F34A4A"
          exlamationmarkfill="#F34A4A"
          width="16"
          height="16"
        />
        Your subscription was canceled and will downgrade on{' '}
        {downgradeDate
          ? DateTime.fromSeconds(downgradeDate).toFormat('MMMM dd, yyyy')
          : ''}
        . After that, all of the subscription benefits and resources will be
        deactivated.
      </p>
      <Button
        className="subscription-canceled-alert__btn"
        onClick={renewSubscription}
      >
        Renew subscription
      </Button>
    </div>
  );
};

export default RenewSubscriptionAlert;
