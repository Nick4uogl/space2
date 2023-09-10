import { DateTime } from 'luxon';

import { priceFormatter } from '../../utils/utils';

const OpenedResourceInfo = ({
  name,
  networks,
  licenceType,
  reservedSeats,
  usedSeats,
  plan,
  price,
  nextAmount,
  nextBillingDate,
}) => {
  return (
    <ul className="profile-subscription-info">
      <li className="flex-space txt-small">
        <p>Resource name</p>
        <p>{name}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Knetminer networks</p>
        <p>{networks}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Type of licence</p>
        <p>{licenceType === 'academic' ? 'Academic' : 'Comercial'}</p>
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
          <p>{reservedSeats - usedSeats} </p>
        </div>
      </li>
      <li className="flex-space txt-small">
        <p>Plan</p>
        <p>{plan === 'year' ? 'Yearly' : 'Monthly'}</p>
      </li>
      <li className="flex-space txt-small">
        <p>Price</p>
        <p>{priceFormatter.format(price)} / per seat</p>
      </li>
      <li className="flex-space txt-small">
        <p>Next Amount (for resource)</p>
        <p>{priceFormatter.format(nextAmount)}</p>
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

export default OpenedResourceInfo;
