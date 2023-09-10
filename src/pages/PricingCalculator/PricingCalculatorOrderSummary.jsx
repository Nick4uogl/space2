import { ReactComponent as AlertIcon } from '../../assets/img/icons/alert.svg';
import { priceFormatter } from '../../utils/utils';

const PricingCalculatorOrderSummary = ({
  addedResources,
  computeSubTotal,
  computeTotal,
  isAcademic,
  isYearly,
  handleProceedToCheckout,
  yearlyDiscount,
  academicDiscount,
  seatsDiscounts,
}) => {
  return (
    <article className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>
      <div className="order-summary__list">
        {addedResources?.map((resource) => {
          let currentDiscount = null;
          const count = resource?.count;
          for (const i in seatsDiscounts) {
            const discount = seatsDiscounts[i];
            const discountValue = 1 - discount?.coef;
            if (
              count >= discount?.from &&
              count < discount?.to &&
              discountValue < 1 &&
              discountValue > 0
            ) {
              console.log('discountValue * 100', discountValue * 100);
              currentDiscount = Math.round(discountValue * 100);
            }
          }
          const withDiscount = resource?.count >= resource?.seatsForDiscount;
          const itemPrice = resource?.price * resource?.count;
          const itemPriceWithDiscount =
            resource.price * resource.count -
            (resource.price * resource.count * currentDiscount) / 100;
          return (
            <div key={resource?.id + 'orderresource'} className="item-summary">
              <div className="item-summary__header">
                <h3 className="item-summary__title">{resource?.source_name}</h3>
                <p className="item-summary__price">
                  {currentDiscount ? (
                    <span className="item-summary__price-old">
                      {priceFormatter.format(itemPrice)}
                    </span>
                  ) : null}

                  {withDiscount
                    ? priceFormatter.format(itemPriceWithDiscount)
                    : priceFormatter.format(itemPrice)}
                </p>
              </div>
              <div className="item-summary__bottom">
                <p className="item-summary__price item-summary__bottom-price">
                  {currentDiscount ? (
                    <span className="item-summary__price-old">
                      {priceFormatter.format(resource?.price * resource?.count)}
                    </span>
                  ) : null}
                  {currentDiscount
                    ? priceFormatter.format(itemPriceWithDiscount)
                    : priceFormatter.format(itemPrice)}{' '}
                  x {resource?.count} seats
                </p>
                {currentDiscount ? (
                  <div className="item-summary__discount pricing-calculator-discount">
                    {currentDiscount}%
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {(isAcademic || isYearly) && addedResources.length != 0 ? (
        <div className="subtotal-summary item-summary">
          <div className="subtotal-summary__header">
            <p>Subtotal</p>
            <p>{priceFormatter.format(computeSubTotal())}</p>
          </div>

          {isYearly ? (
            <div className="subtotal-summary__item">
              <p>Yearly discount</p>
              <p>
                -{priceFormatter.format(computeSubTotal() * yearlyDiscount)}
              </p>
            </div>
          ) : null}
          {isAcademic ? (
            <div className="subtotal-summary__item">
              <p>Usage Discount</p>
              <p>
                {' '}
                -{priceFormatter.format(computeSubTotal() * academicDiscount)}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="order-summary__total flex-space">
        <p className="txt-medium">Total</p>
        <p className="txt-medium">{priceFormatter.format(computeTotal())}</p>
      </div>
      <button
        disabled={addedResources.length === 0}
        className={`${
          addedResources.length === 0 ? 'disabled' : ''
        } order-summary__link`}
        onClick={handleProceedToCheckout}
      >
        PROCEED TO CHECKOUT
      </button>
      <p
        className={`order-summary__label ${
          !isYearly && 'order-summary__label--visible'
        }`}
      >
        <AlertIcon />
        Payment by invoice is only possible with an annual subscription.
      </p>
    </article>
  );
};

export default PricingCalculatorOrderSummary;
