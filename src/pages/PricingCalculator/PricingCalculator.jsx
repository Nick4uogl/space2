import { useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import PricingCalculatorOrderSummary from './PricingCalculatorOrderSummary';
import Header from '../../components/Header/Header';
import PricingCalculatorHeader from '../../components/PricingCalculatorHeader/PricingCalculatorHeader';
import PricingCalculatorResources from '../../components/PricingCalculatorResources/PricingCalculatorResources';
import PricingCalculatorResourcesModal from '../../components/PricingCalculatorResourcesModal/PricingCalculatorResourcesModal';
import PricingCalculatorSelectorBlock from '../../components/PricingCalculatorSelectorBlock/PricingCalculatorSelectorBlock';
import { useGetResourceQuery } from '../../redux/resources/resourcesApiSlice';
import { useGetPaidResourcesQuery } from '../../redux/resources/resourcesApiSlice';
import { setPaymentData } from '../../redux/resources/resourcesSlice';
import { useGetDiscountsInfoQuery } from '../../redux/subscriptions/subscriptionsApiSlice';
import './pricingCalculator.scss';

function PricingCalculator() {
  const [isAcademic, setIsAcademic] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [addedResources, setAddedResources] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [paidResources, setPaidResources] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  //api
  const getResourceResponse = useGetResourceQuery(
    queryParams.get('resourceId'),
  );
  const currentResource = getResourceResponse?.data;
  const getDiscountsResponse = useGetDiscountsInfoQuery();
  const paidReosurcesResponse = useGetPaidResourcesQuery();
  const yearlyDiscount =
    getDiscountsResponse?.data?.coupons_info?.[2].percent_off / 100;
  const academicDiscount =
    getDiscountsResponse?.data?.coupons_info?.[0].percent_off / 100;
  const seatsDiscounts = getDiscountsResponse?.data?.seats_qty_discounts;

  console.log('paidReosurcesResponse', paidReosurcesResponse);

  console.log('getDiscountsResponse', getDiscountsResponse);

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

  const computeSubTotal = () => {
    let subTotal = 0;
    addedResources.map((resource) => {
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
          currentDiscount = Math.round(discountValue * 100);
        }
      }
      subTotal += currentDiscount
        ? resource.price * resource.count -
          (resource.price * resource.count * currentDiscount) / 100
        : resource.price * resource.count;
    });
    return isMonthly ? subTotal : subTotal * 12;
  };

  const computeTotal = () => {
    let total = computeSubTotal();
    if (!isMonthly && isAcademic) {
      total = total - total * yearlyDiscount - total * academicDiscount;
    } else if (!isMonthly) {
      total = total - total * yearlyDiscount;
    } else if (isAcademic) {
      total = total - total * academicDiscount;
    }
    return total ? total : 0;
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

  useEffect(() => {
    const newResource = { ...currentResource };
    newResource.count = 1;
    const updatedPaidResources = paidReosurcesResponse?.data?.map(
      (resource) => ({
        ...resource,
        count: 1,
      }),
    );
    setPaidResources(updatedPaidResources);
    if (currentResource) {
      setAddedResources([newResource]);
    }
  }, [paidReosurcesResponse, currentResource]);

  return (
    <div>
      <Header />
      <div className="pricing-calculator">
        {getDiscountsResponse.isLoading || paidReosurcesResponse.isLoading ? (
          <CircularProgress
            size={55}
            sx={{
              color: '#51CE7B',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: '-22.5px',
            }}
          />
        ) : (
          <div className="pricing-calculator__container">
            <PricingCalculatorHeader
              title={'KnetMiner Pricing Calculator'}
              subtitle={
                'You can invite users to the resource subscription later.'
              }
            />
            <div className="pricing-calculator-content">
              <div className="pricing-calculator-content__left">
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
                  decreaseSeats={decreaseSeats}
                  increaseSeats={increaseSeats}
                  deleteResource={deleteResource}
                  seatsDiscounts={seatsDiscounts}
                />
              </div>
              <div className="pricing-calculator-content__right">
                <PricingCalculatorOrderSummary
                  computeSubTotal={computeSubTotal}
                  computeTotal={computeTotal}
                  addedResources={addedResources}
                  isAcademic={isAcademic}
                  isYearly={!isMonthly}
                  handleProceedToCheckout={handleProceedToCheckout}
                  yearlyDiscount={yearlyDiscount}
                  academicDiscount={academicDiscount}
                  seatsDiscounts={seatsDiscounts}
                />
                {/* <div className="profile-subscription-quotes">
                <h2 className="profile-subscription-quotes__title">
                  Past Quotes
                </h2>
                <div className="profile-subscription-quotes__quote profile-subscription-quote">
                  <div className="profile-subscription-quote__left">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.50033 18.3334H12.5003C16.667 18.3334 18.3337 16.6667 18.3337 12.5V7.50002C18.3337 3.33335 16.667 1.66669 12.5003 1.66669H7.50033C3.33366 1.66669 1.66699 3.33335 1.66699 7.50002V12.5C1.66699 16.6667 3.33366 18.3334 7.50033 18.3334Z"
                        stroke="#121212"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.125 7.5H6.875"
                        stroke="#121212"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.125 12.5H6.875"
                        stroke="#121212"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="profile-subscription-quote__info">
                      <h2>Quote #1</h2>
                      <p>Expire: 07, May 2023</p>
                    </div>
                  </div>
                  <div className="profile-subscription-quote__link">
                    View Quote
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        )}

        <PricingCalculatorResourcesModal
          openModal={openModal}
          handleClose={handleClose}
          addedResources={addedResources}
          setAddedResources={setAddedResources}
          resources={paidResources}
        />
      </div>
    </div>
  );
}

export default PricingCalculator;
