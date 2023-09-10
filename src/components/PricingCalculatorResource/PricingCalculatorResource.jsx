import { IconButton } from '@mui/material';
import { DateTime } from 'luxon';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as TeamsIcon } from '../../assets/img/icons/teams.svg';
import { ButtonLinkOutlined } from '../../styles/muiComponentsStyles';
import { priceFormatter } from '../../utils/utils';

import './pricingCalculatorResource.scss';

function PricingCalculatorRecource({
  name,
  image,
  price,
  id,
  count,
  isManage,
  deleteResource,
  increaseSeats,
  decreaseSeats,
  seatsDiscounts,
  quantity,
  nextBillingDate,
  isSubscribedResource,
  expiryDate,
  cancelResource,
  isExcluded,
}) {
  const currentDiscount = seatsDiscounts?.map((discount) => {
    const discountValue = 1 - discount?.coef;
    if (
      count >= discount?.from &&
      count < discount?.to &&
      discountValue < 1 &&
      discountValue > 0
    )
      return (
        <div className="recource-pricing-calculator__bottom-label pricing-calculator-discount">
          -{Math.round(discountValue * 100)}% Off
        </div>
      );
  });
  return (
    <article className="recource-pricing-calculator">
      <div className="recource-pricing-calculator__header">
        <div className="recource-pricing-calculator__header-leading">
          <img src={`data:image/png;base64, ${image}`} alt={name} />
          <div className="recource-pricing-calculator__info">
            <h2>{name}</h2>
            <p>
              {isManage ? (
                <>
                  Current Seats: {quantity} /
                  {isExcluded ? (
                    <span className="recource-pricing-calculator__expire-date">
                      {' '}
                      Ends:{' '}
                      {DateTime.fromISO(expiryDate, { zone: 'utc' }).toFormat(
                        'MMMM dd, yyyy',
                      )}
                    </span>
                  ) : (
                    `Renews: ${nextBillingDate}`
                  )}
                </>
              ) : (
                `${priceFormatter.format(price)} / per seat`
              )}
            </p>
          </div>
        </div>
        {isExcluded ? (
          <button type="button" className="recource-pricing-calculator__resume">
            Resume
          </button>
        ) : (
          <IconButton
            onClick={() =>
              isSubscribedResource ? cancelResource(id) : deleteResource(id)
            }
            className="recource-pricing-calculator__close"
          >
            <CloseIcon fill="#121212" width="1.25rem" height="1.25rem" />
          </IconButton>
        )}
      </div>
      <div className="recource-pricing-calculator__bottom">
        <div className="recource-pricing-calculator__bottom-header">
          <div className="recource-pricing-calculator__bottom-title">
            <TeamsIcon />
            Seats
          </div>
          <div className="recource-pricing-calculator__bottom-trailing">
            {currentDiscount}

            <ButtonLinkOutlined
              sx={{ minWidth: 'auto', padding: '4px 9px' }}
              onClick={() => decreaseSeats(id)}
              disabled={isExcluded && count <= quantity}
              className="recource-pricing-calculator__bottom-minus recource-pricing-calculator__bottom-btn"
            >
              -
            </ButtonLinkOutlined>
            <div className="recource-pricing-calculator__bottom-count">
              {count}
            </div>
            <ButtonLinkOutlined
              sx={{ minWidth: 'auto', padding: '4px 9px' }}
              onClick={() => increaseSeats(id)}
              className="recource-pricing-calculator__bottom-plus recource-pricing-calculator__bottom-btn"
            >
              +
            </ButtonLinkOutlined>
          </div>
        </div>

        {seatsDiscounts?.map((discount, i) => {
          const discountValue = 1 - discount?.coef;
          if (
            count >= discount?.from &&
            count < discount?.to &&
            discountValue < 1 &&
            seatsDiscounts[i + 1]
          ) {
            return (
              <p key={i} className="recource-pricing-calculator__label">
                Add {discount?.to - count} more for{' '}
                <span>
                  {' '}
                  {Math.round((1 - seatsDiscounts[i + 1]?.coef) * 100)}%
                  discount
                </span>
              </p>
            );
          }
        })}
      </div>
      {count - quantity > 0 && isSubscribedResource && isManage && (
        <div className="recource-pricing-calculator__badge recource-pricing-calculator__badge--blue">
          +{count - quantity} seats
        </div>
      )}
      {count - quantity < 0 && isSubscribedResource && isManage && (
        <div className="recource-pricing-calculator__badge recource-pricing-calculator__badge--yellow">
          {count - quantity} seats
        </div>
      )}
      {!isSubscribedResource && isManage && (
        <div className="recource-pricing-calculator__badge recource-pricing-calculator__badge--green">
          NEW
        </div>
      )}
      {isExcluded && isManage && (
        <div className="recource-pricing-calculator__badge recource-pricing-calculator__badge--red">
          CANCELLED
        </div>
      )}
    </article>
  );
}

export default PricingCalculatorRecource;
