import { ReactComponent as PlusOutlined } from '../../assets/img/icons/plusOutlined.svg';
import { ButtonLink } from '../../styles/muiComponentsStyles';
import PricingCalculatorRecource from '../PricingCalculatorResource/PricingCalculatorResource';
import './pricingCalculatorResources.scss';

const PricingCalculatorResources = ({
  handleOpen,
  addedResources,
  decreaseSeats,
  increaseSeats,
  deleteResource,
  isManage,
  seatsDiscounts,
  nextBillingDate,
  subscribedResources,
  excludedResources,
  cancelResource,
}) => {
  return (
    <div className="resources-calculator">
      <div className="resources-calculator__header">
        <h2 className="resources-calculator__title">Resources</h2>
        <ButtonLink
          sx={{ gap: '0.56rem' }}
          onClick={() => handleOpen()}
          className="resources-calculator__btn"
        >
          Add Resource
          <PlusOutlined />
        </ButtonLink>
      </div>
      {addedResources.map((resource) => {
        const isSubscribedResource = subscribedResources?.find(
          (subResource) => resource?.id === subResource?.id,
        );
        const isExcluded = excludedResources?.find(
          (exResource) => resource?.id === exResource?.id,
        );
        return (
          <PricingCalculatorRecource
            key={resource?.id + 'addedresourcevh'}
            id={resource?.id}
            name={resource?.source_name}
            image={resource?.image}
            price={resource.price}
            count={resource.count}
            discount={resource.discount}
            decreaseSeats={decreaseSeats}
            increaseSeats={increaseSeats}
            deleteResource={deleteResource}
            isManage={isManage}
            seatsDiscounts={seatsDiscounts}
            quantity={resource?.quantity || resource?.seats_quantity}
            nextBillingDate={nextBillingDate}
            isSubscribedResource={isSubscribedResource}
            isExcluded={isExcluded}
            expiryDate={resource?.expiry_date}
            cancelResource={cancelResource}
          />
        );
      })}
    </div>
  );
};

export default PricingCalculatorResources;
