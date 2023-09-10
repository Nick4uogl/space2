import { useState, useEffect } from 'react';

import './forgotPassword.scss';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import arrowBack from '../../assets/img/auth/Left.svg';
import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import SignInWrapper from '../../components/SignInWrapper/SignInWrapper';
import SignUpSuccessModal from '../../components/SignUpSuccesModal/SignUpSuccessModal';
import SizedBox from '../../lib/SizedBox/SizedBox';
import { useResetPasswordMutation } from '../../redux/user/userApiSlice';

function ForgotPassword() {
  const [isComplete, setIsComplete] = useState(false);
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const [openAlert, setOpenAlert] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await resetPassword({ email: data.email }).unwrap();
    setIsComplete(true);
  };

  const handleAlertClose = () => setOpenAlert(false);

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
      setErrorTxt(error?.data?.email[0] ?? 'Server error');
    }
  }, [error]);

  return (
    <SignInWrapper>
      <SignUpSuccessModal openModal={isComplete} />
      <AuthWrapper
        error={errorTxt}
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
              <p className="auth-title">Forgot password?</p>
              <div className="forgot-password__subtitle">
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.
              </div>
            </div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className={'form-group'}>
                <label htmlFor="email" className="form-group__label">
                  Email address
                </label>
                <input
                  className="form-group__control"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors?.email?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <SizedBox mb={30} />
              <button
                type="submit"
                className={`btn ${
                  (!watch('email') || errors?.email?.message) && 'btn--disabled'
                }`}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: '#fff' }} size={27} />
                ) : (
                  <>Send Reset Instructions</>
                )}
              </button>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default ForgotPassword;
