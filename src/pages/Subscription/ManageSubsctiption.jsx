import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ManageSubscriptionOrderSummary from './ManageSubscriptionOrderSummary';
import PageLocation from '../../components/PageLocation/PageLocation';
import PricingCalculatorHeader from '../../components/PricingCalculatorHeader/PricingCalculatorHeader';
import PricingCalculatorResources from '../../components/PricingCalculatorResources/PricingCalculatorResources';
import PricingCalculatorResourcesModal from '../../components/PricingCalculatorResourcesModal/PricingCalculatorResourcesModal';
import PricingCalculatorSelectorBlock from '../../components/PricingCalculatorSelectorBlock/PricingCalculatorSelectorBlock';
import { useGetPaidResourcesQuery } from '../../redux/resources/resourcesApiSlice';
import { setPaymentData } from '../../redux/resources/resourcesSlice';
import {
  useGetDiscountsInfoQuery,
  useGetSubscriptionQuery,
  useGetScheduledSubscriptionQuery,
} from '../../redux/subscriptions/subscriptionsApiSlice';
import ProfileWrapper from '../Profile/ProfileWrapper';

import './manageSubscription.scss';

const ManageSubsctiption = () => {
  const [isAcademic, setIsAcademic] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [addedResources, setAddedResources] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [paidResources, setPaidResources] = useState([]);
  const [excludedResources, setExcludedResources] = useState([]);

  //api
  const getDiscountsResponse = useGetDiscountsInfoQuery();
  const subscriptionResponse = useGetSubscriptionQuery();
  const paidReosurcesResponse = useGetPaidResourcesQuery();
  const scheduledSubscriptionResponse = useGetScheduledSubscriptionQuery();
  const scheduledSubscription = scheduledSubscriptionResponse?.data;
  const yearlyDiscount =
    getDiscountsResponse?.data?.coupons_info?.[2].percent_off / 100;
  const academicDiscount =
    getDiscountsResponse?.data?.coupons_info?.[0].percent_off / 100;
  const seatsDiscounts = getDiscountsResponse?.data?.seats_qty_discounts;

  console.log('subscriptionResponse', subscriptionResponse);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const updateAddedResources = (resourceId, updateFn) => {
    setAddedResources((prevState) =>
      prevState?.map((resource) =>
        resource.id === resourceId ? updateFn(resource) : resource,
      ),
    );
  };

  const increaseSeats = (resourceId) => {
    updateAddedResources(resourceId, (resource) => ({
      ...resource,
      count: resource.count + 1,
    }));
  };

  const decreaseSeats = (resourceId) => {
    updateAddedResources(resourceId, (resource) => ({
      ...resource,
      count: Math.max(resource.count - 1, 1),
    }));
  };

  const deleteResource = (resourceId) => {
    const updatedRecources = addedResources.filter(
      (resource) => resource.id !== resourceId,
    );
    setAddedResources(updatedRecources);
  };

  const applyDiscount = (resource) => {
    const count = resource?.count;
    const applicableDiscount = seatsDiscounts.find((discount) => {
      const discountValue = 1 - discount?.coef;
      return (
        count >= discount?.from &&
        count < discount?.to &&
        discountValue < 1 &&
        discountValue > 0
      );
    });
    if (applicableDiscount) {
      const discountValue = Math.round(1 - applicableDiscount?.coef);
      const discountedPrice = (resource.price * count * discountValue) / 100;
      console.log('resource.price', resource.price);

      return resource.price * count - discountedPrice;
    }

    return resource.price * count;
  };

  const computeSubTotal = () => {
    let subTotal = addedResources.reduce((total, resource) => {
      total += applyDiscount(resource);
      return total;
    }, 0);

    return isMonthly ? subTotal : subTotal * 12;
  };

  const computeTotal = () => {
    const subTotal = computeSubTotal();
    console.log('subTotal', subTotal);
    const withYearlyDiscount = !isMonthly ? subTotal * yearlyDiscount : 0;
    const withUsageDiscount = isAcademic ? subTotal * academicDiscount : 0;
    const total = subTotal - withYearlyDiscount - withUsageDiscount;
    return total;
  };

  const handleProceedToCheckout = () => {
    dispatch(
      setPaymentData({
        resources: addedResources,
        total: computeTotal(),
        isAcademic: isAcademic,
        isYearly: !isMonthly,
      }),
    );
    navigate('/choose-payment');
  };

  const withCountResources = (resources) => {
    return (
      resources?.map((resource) => ({
        ...resource,
        count: resource?.seats_quantity,
      })) || []
    );
  };

  console.log('scheduledSubscription?.resources', scheduledSubscription);

  const cancelResource = (id) => {
    const excludedResource = addedResources?.find(
      (resource) => resource?.id === id,
    );
    setExcludedResources([...excludedResources, excludedResource]);
  };

  useEffect(() => {
    const updatedPaidResources =
      paidReosurcesResponse?.data?.map((resource) => ({
        ...resource,
        count: 1,
      })) || [];
    setPaidResources(updatedPaidResources);
    const excluded = withCountResources(
      scheduledSubscription?.excluded_resources,
    );
    setExcludedResources(excluded);
    console.log('excluded', excluded);
    const subscribed = withCountResources(
      scheduledSubscription?.current_resources,
    );
    setAddedResources(subscribed ?? []);
  }, [paidReosurcesResponse, scheduledSubscription]);

  const isProceedToCheckout = () => {
    let isResourcesSeatsAdded = false;
    addedResources?.map((resource) => {
      if (resource?.count > resource?.seats_quantity) {
        isResourcesSeatsAdded = true;
      }
    });
    console.log('isResourcesSeatsAdded', isResourcesSeatsAdded);
    return (
      isResourcesSeatsAdded ||
      addedResources?.length > scheduledSubscription?.current_resources
    );
  };

  return (
    <ProfileWrapper>
      <div className="manage-subscription">
        <div className="manage-subscription__container">
          <PageLocation items={['Subscription', 'Manage Subscription']} />
          <PricingCalculatorHeader
            title={'Manage Subscription'}
            subtitle={'You can edit your subscription here.'}
            backLink={'Back to subscription'}
          />
          <div className="manage-subscription__content pricing-calculator-content">
            <div className="manage-subscription__left pricing-calculator-content__left">
              <PricingCalculatorSelectorBlock
                switched={isAcademic}
                setValue={setIsAcademic}
                title={'Usage type'}
                firstOption={'Comercial'}
                secondOption={'Academic'}
                secondOptionDiscount={academicDiscount * 100}
              />
              <PricingCalculatorSelectorBlock
                switched={isMonthly}
                setValue={setIsMonthly}
                discount={yearlyDiscount * 100}
                title={'Billing cycle'}
                firstOption={'Yearly'}
                secondOption={'Monthly'}
                firstOptionDiscount={yearlyDiscount * 100}
              />
              <PricingCalculatorResources
                handleOpen={handleOpen}
                addedResources={addedResources}
                excludedResources={excludedResources}
                subscribedResources={
                  scheduledSubscriptionResponse?.data?.current_resources
                }
                decreaseSeats={decreaseSeats}
                increaseSeats={increaseSeats}
                deleteResource={deleteResource}
                cancelResource={cancelResource}
                nextBillingDate={
                  subscriptionResponse?.data?.formatted_next_payment_datetime
                }
                isManage={true}
                seatsDiscounts={seatsDiscounts}
              />
            </div>
            <div className="manage-subscription__right pricing-calculator-content__right">
              <ManageSubscriptionOrderSummary
                computeSubTotal={computeSubTotal}
                computeTotal={computeTotal}
                addedResources={addedResources}
                isAcademic={isAcademic}
                isYearly={!isMonthly}
                handleProceedToCheckout={handleProceedToCheckout}
                subscribedResources={subscriptionResponse?.data?.resources}
                seatsDiscounts={seatsDiscounts}
                excludedResources={excludedResources}
                isProceedToCheckout={isProceedToCheckout()}
              />
            </div>
          </div>
        </div>
        <PricingCalculatorResourcesModal
          openModal={openModal}
          handleClose={handleClose}
          addedResources={addedResources}
          setAddedResources={setAddedResources}
          resources={paidResources}
        />
      </div>
    </ProfileWrapper>
  );
};

export default ManageSubsctiption;
