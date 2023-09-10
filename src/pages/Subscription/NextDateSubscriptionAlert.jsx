import { DateTime } from 'luxon';

import { AlertIcon } from '../../components/Svgs/Svgs';
import { priceFormatter } from '../../utils/utils';

const NextDateSubscriptionAlert = ({ renewDate, price }) => {
  return (
    <div className="profile-subscription__alert flex-align-center">
      <AlertIcon
        circlefill="#51CE7B"
        exlamationmarkfill="#51CE7B"
        width="16"
        height="16"
      />
      <p>
        Your Annual subscription renews automatically on{' '}
        <span className="txt-small-bold-underlined">
          {renewDate
            ? DateTime.fromSeconds(renewDate).toFormat('MMMM dd, yyyy')
            : ''}
        </span>{' '}
        and you’ll be billed{' '}
        <span className="txt-small-bold">{priceFormatter.format(price)}</span>
      </p>
    </div>
  );
};

export default NextDateSubscriptionAlert;
