import { useEffect, useState } from 'react';

import { Checkbox } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import arrowBack from '../../assets/img/auth/Left.svg';
import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import SignInWrapper from '../../components/SignInWrapper/SignInWrapper';
import SignUpSuccessModal from '../../components/SignUpSuccesModal/SignUpSuccessModal';
import SizedBox from '../../lib/SizedBox/SizedBox';
import { useSignUpMutation } from '../../redux/user/userApiSlice';
import { selectUserSignUpData } from '../../redux/user/userSlice';

import classes from './completeSignUp.module.scss';

function CompleteSignUp() {
  const [isComplete, setIsComplete] = useState(false);
  const userSignUpData = useSelector(selectUserSignUpData);
  const navigate = useNavigate();
  const [alertTxt, setAlertTxt] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      isSubscribe: false,
    },
  });
  const [signUp, signUpResponse] = useSignUpMutation();

  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      await signUp({
        email: userSignUpData?.email ? userSignUpData?.email : '',
        password: userSignUpData?.password ? userSignUpData?.password : '',
        image: userSignUpData?.image ? userSignUpData?.image : '',
        organisation: data.organization,
        first_name: data.firstName,
        last_name: data.lastName,
        mailchimp_subscription: data.isSubscribe,
        google_auth: userSignUpData?.google_auth
          ? userSignUpData?.google_auth
          : false,
      }).unwrap();
      if (!userSignUpData?.google_auth) {
        setIsComplete(true);
      } else {
        navigate('/sign-in');
      }
    } catch (err) {
      if (err.originalStatus === 500) {
        setOpenAlert(true);
        setAlertTxt('Server error');
      }
    }
  };

  const handleAlertClose = () => setOpenAlert(false);

  useEffect(() => {
    if (!userSignUpData) {
      navigate('/sign-up');
    }
  }, [userSignUpData, navigate]);

  useEffect(() => {
    if (signUpResponse?.error) {
      setOpenAlert(true);
      setAlertTxt(
        signUpResponse?.error?.data?.error
          ? signUpResponse?.error?.data?.error
          : 'Failed to sign up',
      );
    }
  }, [signUpResponse]);

  console.log('signUpResponse', signUpResponse);

  return (
    <SignInWrapper>
      <SignUpSuccessModal openModal={isComplete} />
      <AuthWrapper
        error={alertTxt}
        handleAlertClose={handleAlertClose}
        openAlert={openAlert}
      >
        <div className={'auth-page'}>
          <div className="auth-page__back">
            <button onClick={() => navigate(-1)} className="flex-align-center">
              <img src={arrowBack} alt="" />
              Go Back
            </button>
          </div>
          <div className="auth-center">
            <div className="auth-center__top">
              <p className="auth-title">Complete sign up</p>
            </div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group-container">
                <div className={'form-group'}>
                  <label htmlFor="firstName" className="form-group__label">
                    First Name
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'first name is required',
                    })}
                    className="form-group__control"
                    defaultValue={
                      userSignUpData?.first_name
                        ? userSignUpData?.first_name
                        : ''
                    }
                  />
                  {errors?.firstName && (
                    <p className="form-group__error form-group__error-input">
                      {errors?.firstName?.message}
                    </p>
                  )}
                </div>
                <div className={'form-group'}>
                  <label htmlFor="lastName" className="form-group__label">
                    Last Name
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'last name is required',
                    })}
                    className="form-group__control"
                    defaultValue={
                      userSignUpData?.last_name ? userSignUpData?.last_name : ''
                    }
                  />
                  {errors?.lastName && (
                    <p className="form-group__error form-group__error-input">
                      {errors?.lastName?.message}
                    </p>
                  )}
                </div>
              </div>
              <SizedBox mt={25} />

              <div
                className={`form-group ${classes['complete-sign-up-form-group']}`}
              >
                <label htmlFor="organisation" className="form-group__label">
                  Organisation
                </label>
                <div className="form-group__password-input">
                  <input
                    className={`form-group__control ${classes['sign-up__password']}`}
                    {...register('organization', {
                      required: 'Organization is required',
                    })}
                  />
                </div>
                {errors?.organization && (
                  <p className="form-group__error form-group__error-input">
                    {errors?.organization?.message}
                  </p>
                )}
              </div>
              <SizedBox mt={28} />
              <div className={classes['complete-sign-up-check-container']}>
                <div className={classes['complete-sign-up-check']}>
                  <Controller
                    name="isAgreed"
                    control={control}
                    rules={{ required: 'Check this field to complete' }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        className={classes['complete-sign-up-checkbox']}
                      />
                    )}
                  />
                  <label htmlFor="isAgreed">
                    I agree with Terms & Conditions and Data Privacy Policy
                  </label>
                </div>
                {errors && (
                  <p className="form-group__error form-group__error-check">
                    {errors?.isAgreed?.message}
                  </p>
                )}
              </div>

              <SizedBox mt={20} />
              <div className={classes['complete-sign-up-check-container']}>
                <div className={classes['complete-sign-up-check']}>
                  <Controller
                    name="isSubscribe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        className={classes['complete-sign-up-checkbox']}
                      />
                    )}
                  />
                  <label htmlFor="isSubscribe">Subscribe to newsletter</label>
                </div>
              </div>

              <button
                type="submit"
                className={`btn ${classes['complete-sign-up__button']} ${
                  !watch('isAgreed') ||
                  !watch('firstName') ||
                  !watch('lastName') ||
                  !watch('organization')
                    ? 'btn--disabled'
                    : ''
                }`}
              >
                {signUpResponse?.isLoading ? (
                  <CircularProgress sx={{ color: '#fff' }} size={27} />
                ) : (
                  <>Complete account</>
                )}
              </button>
              <div className="auth-center__bottom-label">
                Already have an account?
                <Link to="/sign-in"> Log In.</Link>
              </div>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default CompleteSignUp;
