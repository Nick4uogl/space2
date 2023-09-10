import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import SignInWrapper from '../../components/SignInWrapper/SignInWrapper';
import SizedBox from '../../lib/SizedBox/SizedBox';
import {
  useResetPasswordConfirmMutation,
  useGetUserInfoQuery,
} from '../../redux/user/userApiSlice';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../utils/validators';

function PasswordReset() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'all' });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTxt, setAlertTxt] = useState('');

  const [resetPasswordConfirm, { isLoading, error }] =
    useResetPasswordConfirmMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const userInfoResponse = useGetUserInfoQuery(queryParams.get('token'));

  const onSubmit = async (data) => {
    try {
      await resetPasswordConfirm({
        password: data.password,
        token: queryParams.get('token'),
      }).unwrap();
      navigate('/sign-in');
    } catch (err) {
      if (err.originalStatus === 500) {
        setAlertTxt('server error');
      }
    }
  };

  const handleAlertClose = () => setOpenAlert(false);

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
      setAlertTxt(error?.data?.error ?? 'provide valid information');
    }
  }, [error]);

  return (
    <SignInWrapper>
      <AuthWrapper
        error={alertTxt}
        handleAlertClose={handleAlertClose}
        openAlert={openAlert}
      >
        <div className="auth-page">
          <div className="auth-center">
            <div className="auth-center__top">
              <p className="auth-title">
                Nice to see you, {userInfoResponse?.data?.user?.first_name}
              </p>
              <p className="auth-subtitle">
                Let’s get you back into your account.
              </p>
            </div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className={'form-group'}>
                <label
                  htmlFor="password"
                  className="form-group__label sign-in__label"
                >
                  New Password
                </label>
                <div className="form-group__password-input">
                  <input
                    type="password"
                    className={'form-group__control'}
                    {...register('password', validatePassword)}
                  />
                </div>
                {errors?.password?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <SizedBox mt={27} />

              <div className={'form-group'}>
                <label htmlFor="confirmPassword" className="form-group__label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword', validateConfirmPassword)}
                  className="form-group__control"
                />
                {errors?.confirmPassword?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <SizedBox mt={27} />
              <button
                type="submit"
                className={`btn ${
                  errors?.password ||
                  errors?.confirmPassword ||
                  !watch('password') ||
                  !watch('confirmPassword')
                    ? 'btn--disabled'
                    : ''
                }`}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: '#444141' }} size={27} />
                ) : (
                  <>Reset and Login</>
                )}
              </button>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default PasswordReset;
