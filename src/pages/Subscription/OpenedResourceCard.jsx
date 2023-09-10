import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../../assets/img/icons/next.svg';
import {
  ButtonLinkOutlined,
  ButtonLink,
} from '../../styles/muiComponentsStyles';

const OpenedResourceCard = ({
  image,
  handleOpenCancelSubscription,
  name,
  endDate,
}) => {
  return (
    <div className="resource-subscription-card">
      <div className="resource-subscription-card__left flex-align-center">
        <img src={`data:image/png;base64, ${image}`} alt="" />
        <div className="resource-subscription-card__right">
          <div>
            <div className="resource-subscription-card__info">
              <h3 className="resource-subscription-card__title heading-2">
                {name}
              </h3>
              <p className="resource-subscription-card__subtitle">
                End:{' '}
                {endDate
                  ? DateTime.fromSeconds(endDate).toFormat('MMMM dd, yyyy')
                  : ''}
              </p>
            </div>
            <div className="resource-subscription-card__actions flex-align-center">
              <ButtonLinkOutlined>
                Manage Subscription <ArrowRight stroke="#121212" />
              </ButtonLinkOutlined>
              <ButtonLink onClick={handleOpenCancelSubscription}>
                Cancel Subscription <ArrowRight stroke="#6F7F8F" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedResourceCard;
