import { DateTime } from 'luxon';

import { priceFormatter } from '../../utils/utils';

const ProfileSubscriptionInfo = ({
  licenceType,
  resourcesQuantity,
  reservedSeats,
  usedSeats,
  plan,
  nextAmount,
  nextBillingDate,
}) => {
  return (
    <ul className="profile-subscription-info">
      <li className="flex-space txt-small">
        <p>Type of licence</p>
        <p>{licenceType === 'academic' ? 'Academic' : 'Comercial'}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Resources</p>
        <p>{resourcesQuantity}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Reserved seats</p>
        <p>{reservedSeats}</p>
      </li>
      <li className="profile-subscription-info__option--gray">
        <div className="flex-space txt-small">
          <p>Used</p>
          <p>{usedSeats}</p>
        </div>
        <div className="flex-space txt-small">
          <p>Avaliable</p>
          <p>{reservedSeats - usedSeats}</p>
        </div>
      </li>
      <li className="flex-space txt-small">
        <p>Plan</p>
        <p>{plan === 'year' ? 'Yearly' : 'Monthly'}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Next Amount</p>
        <p>{nextAmount ? priceFormatter.format(nextAmount) : ''}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Next Billing Date</p>
        <p>
          {nextBillingDate
            ? DateTime.fromSeconds(nextBillingDate).toFormat('MMMM dd, yyyy')
            : ''}
        </p>
      </li>
    </ul>
  );
};

export default ProfileSubscriptionInfo;
