import { ReactComponent as AlertIcon } from '../../assets/img/icons/alert.svg';
import { priceFormatter } from '../../utils/utils';
import './manageSubscriptionOrderSummary.scss';

const ManageSubscriptionOrderSummary = ({
  addedResources,
  computeSubTotal,
  computeTotal,
  isAcademic,
  isYearly,
  handleProceedToCheckout,
  subscribedResources,
  seatsDiscounts,
  excludedResources,
  isProceedToCheckout,
}) => {
  return (
    <article className="order-summary">
      <h2 className="order-summary__title flex-space">
        Order Summary
        <div className="order-summary__badge">Reset changes</div>
      </h2>
      <div className="order-summary__list">
        {addedResources?.map((resource) => {
          let currentDiscount = 0;
          let previousDiscount = 0;
          const { id, count, price, source_name } = resource;
          const quantity = resource?.quantity || resource?.seats_quantity;
          const isSubscribedResource = subscribedResources?.find(
            (subResource) => resource?.id === subResource?.id,
          );
          seatsDiscounts?.forEach((discount) => {
            const { from, to, coef } = discount;
            const discountValue = 1 - coef;

            if (quantity >= from && quantity < to) {
              previousDiscount = Math.round(discountValue * 100);
            }

            if (count >= from && count < to) {
              currentDiscount = Math.round(discountValue * 100);
            }
          });
          const isExcluded = excludedResources?.find(
            (exResource) => resource?.id === exResource?.id,
          );
          const prevItemPrice = price * quantity;
          const itemPrice = price * count;
          const itemPriceWithDiscount =
            itemPrice - (itemPrice * currentDiscount) / 100;
          const prevItemPriceWithDiscount =
            prevItemPrice - (prevItemPrice * previousDiscount) / 100;

          if (
            (count - quantity > 0 || count - quantity < 0) &&
            (isSubscribedResource || isExcluded)
          ) {
            return (
              <div key={id + 'orderresource'} className="item-summary">
                <div className="item-summary__header">
                  <h3 className="item-summary__edited">
                    {source_name} x {quantity} seats
                  </h3>
                  <p className="item-summary__edited">
                    {priceFormatter.format(prevItemPriceWithDiscount)}
                  </p>
                </div>
                <div className="item-summary__bottom">
                  <p>
                    {source_name} x {count} seats
                  </p>
                  <p>{priceFormatter.format(itemPriceWithDiscount)}</p>
                </div>
              </div>
            );
          } else if (!isSubscribedResource) {
            return (
              <div key={id + 'orderresource'} className="item-summary">
                <div className="item-summary__bottom">
                  <p>
                    {source_name} x {count} seats
                  </p>
                  <p>{priceFormatter.format(itemPriceWithDiscount)}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {(!isAcademic || isYearly) && addedResources.length != 0 ? (
        <div className="subtotal-summary item-summary">
          <div className="subtotal-summary__header">
            <p>Subtotal</p>
            <p>{priceFormatter.format(computeSubTotal())}</p>
          </div>

          {isYearly ? (
            <div className="subtotal-summary__item">
              <p>Yearly discount</p>
              <p>-{priceFormatter.format(computeSubTotal() * 0.4)}</p>
            </div>
          ) : null}
          {isAcademic ? (
            <div className="subtotal-summary__item">
              <p>Usage Discount</p>
              <p> -{priceFormatter.format(computeSubTotal() * 0.5)}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="order-summary__total flex-space">
        <p className="txt-medium">Total</p>
        <p className="txt-medium">{priceFormatter.format(computeTotal())}</p>
      </div>
      {isProceedToCheckout ? (
        <button
          disabled={addedResources.length === 0}
          className={`${
            addedResources.length === 0 ? 'disabled' : ''
          } order-summary__link`}
          onClick={handleProceedToCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      ) : (
        <button
          disabled={addedResources.length === 0}
          className={`${
            addedResources.length === 0 ? 'disabled' : ''
          } order-summary__link`}
          onClick={handleProceedToCheckout}
        >
          CONFIRM CHANGES
        </button>
      )}

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

export default ManageSubscriptionOrderSummary;
