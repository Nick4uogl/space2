import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../../assets/img/icons/next.svg';
import noImageSvg from '../../assets/img/noname.svg';
const ResourceCardSubscription = ({
  image,
  name,
  seats,
  usedSeats,
  id,
  renewDate,
}) => {
  return (
    <article className="profile-subscription-resource">
      <div className="profile-subscription-resource__container">
        <div className="profile-subscription-resource__top">
          <img
            src={image ? `data:image/png;base64, ${image}` : noImageSvg}
            alt=""
          />
          <div className="profile-subscription-resource__top-info">
            <h3 className="profile-subscription-resource__top-title">{name}</h3>
            <p className="profile-subscription-resource__top-subtitle">
              Renew:{' '}
              {renewDate
                ? DateTime.fromSeconds(renewDate).toFormat('MMMM dd, yyyy')
                : ''}
            </p>
          </div>
        </div>
        <div className="profile-subscription-resource__seats-info profile-subscription-resource-seats">
          <div className="profile-subscription-resource-seats__line">
            <div
              className="profile-subscription-resource-seats__indicator"
              style={{ width: `calc(${usedSeats} / ${seats} * 100%)` }}
            ></div>
          </div>
          <div className="profile-subscription-resource-seats__bottom flex-space">
            <div className="profile-subscription-resource-seats__bottom-left">
              Seats:
              <div className="profile-subscription-resource__seats-participants"></div>
            </div>
            <p className="profile-subscription-resource-seats__count">
              {usedSeats} / {seats}
            </p>
          </div>
        </div>
        <div className="profile-subscription-resource__bottom">
          <Link
            to={`/subscription/${id}`}
            className="txt-small flex-align-center"
          >
            Open
            <ArrowRight width="12" height="12" stroke="#121212" />
          </Link>
          <Link to="" className="profile-subscription-resource__edit-link">
            Edit seats
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ResourceCardSubscription;
