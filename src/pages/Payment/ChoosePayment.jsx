import { useState } from 'react';

import './payment.scss';
import { CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select, { components } from 'react-select';

import { choosePaymentSelectStyles } from './paymentStyles';
import { ReactComponent as AlertIcon } from '../../assets/img/icons/alert.svg';
import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
import { ReactComponent as CheckMark } from '../../assets/img/icons/checkmark.svg';
import { ReactComponent as CreditCardIcon } from '../../assets/img/icons/creditCard.svg';
import { ReactComponent as LockIcon } from '../../assets/img/icons/lock.svg';
import stripeImage from '../../assets/img/stripe.png';
import DropdownIndicator from '../../components/DropDownIndicator/DropDownIndicator';
import Header from '../../components/Header/Header';
import Popup from '../../components/StyledAlert/Popup';
import { InvoiceIcon } from '../../components/Svgs/Svgs';
import { selectPaymentData } from '../../redux/resources/resourcesSlice';
import { useCreateSubscriptionMutation } from '../../redux/subscriptions/subscriptionsApiSlice';

const stripePromise = loadStripe(
  'pk_test_51NQYEZK6h2Qb5LanNt9Qt13xhYRD5ciQWSKWo5IdZB9ni6H7SerXAqUTnm2U8TymGlzN4dzgcDkFZiSF0WGkGsVR00xZNH1MQe',
);

const CustomOption = (props) => (
  <components.Option {...props}>
    {props.isSelected && (
      <CheckMark
        fill="#51CE7B"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '0.62rem',
          width: '1.25rem',
          height: '1.25rem',
        }}
      />
    )}

    {props.label}
  </components.Option>
);

const ChoosePayment = () => {
  //state
  const [paymentMethodOption, setPaymentMethodOption] = useState({
    value: 'credit card',
    label: (
      <div className="flex-align-center payment-method__control-option">
        <CreditCardIcon /> Credit Card
      </div>
    ),
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState('');

  //hooks
  const navigate = useNavigate();
  const paymentData = useSelector(selectPaymentData);

  //api
  const [createSubscription, createSubscriptionResponse] =
    useCreateSubscriptionMutation();

  console.log('createSubscriptionResponse', createSubscriptionResponse);

  const handlePayment = async () => {
    if (paymentMethodOption.value === 'invoice') {
      navigate('/invoice-payment');
    } else {
      try {
        const stripe = await stripePromise;
        console.log(3245364);
        const result = await createSubscription({
          pay_with_invoice: false,
          resource_quantity_pairs: paymentData.resources?.map((resource) => ({
            resource_id: resource.id,
            quantity: resource.count,
          })),
          subscription_plan: paymentData.isYearly ? 'year' : 'month',
          is_academic: paymentData.isAcademic,
          total_price: paymentData.total,
        }).unwrap();

        await stripe.redirectToCheckout({
          sessionId: result?.session_id,
        });
      } catch (err) {
        console.log('err', err);
        setOpenAlert(true);
      }
    }
  };

  const handleAlertClose = () => setOpenAlert(false);

  const handlePaymentOptionChange = (selected) =>
    setPaymentMethodOption(selected);
  const paymentMethodOptions = [
    {
      value: 'credit card',
      label: (
        <div className="flex-align-center payment-method__control-option">
          <CreditCardIcon /> Credit Card
        </div>
      ),
    },
    {
      value: 'invoice',
      label: (
        <div className="flex-align-center payment-method__control-option">
          <InvoiceIcon stroke="#121212" /> Invoice
        </div>
      ),
      isDisabled: !paymentData?.isYearly,
    },
  ];

  if (!paymentData) {
    navigate('/pricing-calculator');
  }
  return (
    <div
      className="choose-payment-page"
      style={{ paddingBottom: !paymentData?.isYearly && '2rem' }}
    >
      <Header />
      <div
        className="choose-payment-page__wrapper"
        style={{ paddingTop: !paymentData?.isYearly && '3rem' }}
      >
        <div className="choose-payment-page__container">
          <h2 className="choose-payment-page__title">Confirm purchase</h2>
          <p className="choose-payment-page__subtitle">
            Please note credit card payment option is not available for bigger
            purchases.
          </p>
          <div className="choose-payment">
            <div className="choose-payment__title">Payment Method</div>

            <Select
              options={paymentMethodOptions}
              value={paymentMethodOption}
              onChange={handlePaymentOptionChange}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: DropdownIndicator,
                Option: CustomOption,
              }}
              styles={choosePaymentSelectStyles}
            />
            {paymentMethodOption.value === 'credit card' && (
              <div className="choose-payment-stripe-tile">
                <div className="choose-payment-stripe-tile__header flex-space">
                  <div className="choose-payment-stripe-tile__text-secure flex-align-center">
                    <LockIcon />
                    Secure Payment
                  </div>
                  <img src={stripeImage} alt="stripe" />
                </div>
                <p className="choose-payment-stripe-tile__text">
                  You will be redirected to our partner Stripe, where you’ll
                  complete the rest of the payment process.
                </p>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="choose-payment-page__btn btn"
            >
              {createSubscriptionResponse.isLoading ? (
                <CircularProgress sx={{ color: '#fff' }} size={27} />
              ) : (
                'Proceed'
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-align-center choose-payment-page__back"
            >
              <ArrowLeft fill="#6f7f8f" />
              Previous Step
            </button>
          </div>
        </div>
      </div>
      {!paymentData?.isYearly && (
        <p className="choose-payment-page__alert flex-align-center">
          <AlertIcon />
          Payment by invoice is only possible with an annual subscription.
        </p>
      )}
      <Popup
        alertSeverity={'error'}
        alertText={'Payment error'}
        openAlert={openAlert}
        handleAlertClose={handleAlertClose}
      />
    </div>
  );
};

export default ChoosePayment;
