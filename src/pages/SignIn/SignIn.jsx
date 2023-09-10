import { useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import SignInWrapper from '../../components/SignInWrapper/SignInWrapper';
import SizedBox from '../../lib/SizedBox/SizedBox';
import { useLoginMutation } from '../../redux/auth/authApiSlice';
import { useGoogleLoginMutation } from '../../redux/auth/authApiSlice';
import { setUserSignUpData } from '../../redux/user/userSlice';
import './signIn.scss';

const SERVER_ERROR_MESSAGE = 'Server error';

const getErrorMessage = (error) => {
  if (!error) {
    return 'No Server Response';
  } else if (error.status === 400) {
    return error?.data?.error;
  } else if (error.status === 401) {
    return 'Unauthorized';
  } else {
    return 'Login Failed';
  }
};

function SignIn() {
  const [googleLogin, googleLoginData] = useGoogleLoginMutation();
  const [alertTxt, setAlertTxt] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [login, loginData] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'all' });

  const googleSuccess = async (credentialResponse) => {
    const response = await googleLogin({
      id_token: credentialResponse.credential,
    }).unwrap();
    if (response?.access) {
      navigate('/');
    } else {
      dispatch(setUserSignUpData(response));
      navigate('/complete-sign-up');
    }
  };

  const handleAlertClose = () => setOpenAlert(false);

  const onSubmit = async (data) => {
    try {
      await login({
        username: data.email,
        password: data.password,
      }).unwrap();
      navigate('/');
    } catch (err) {
      setOpenAlert(true);
      setAlertTxt(getErrorMessage(err) || SERVER_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    if (googleLoginData?.error || loginData?.error) {
      setOpenAlert(true);
      setAlertTxt(
        getErrorMessage(googleLoginData.error || loginData.error) ||
          SERVER_ERROR_MESSAGE,
      );
    }
  }, [googleLoginData, loginData]);

  const isDisabled =
    !watch('email') ||
    !watch('password') ||
    errors?.password?.message ||
    errors?.email?.message;

  return (
    <SignInWrapper>
      <AuthWrapper
        error={alertTxt}
        handleAlertClose={handleAlertClose}
        openAlert={openAlert}
      >
        <div className={'auth-page'}>
          <div className="auth-center">
            <div className="auth-center__top">
              <p className="auth-title">Log in to KnetMiner</p>
              <GoogleLogin
                onSuccess={googleSuccess}
                className="google-auth-btn"
                onError={() => {
                  setAlertTxt('Something went wrong logging with google');
                  setOpenAlert(true);
                }}
                width="400px"
                size="large"
                logo_alignment="center"
                locale="en"
                text="continue_with"
              />
            </div>
            <div className="sep-line">
              <div className="sep-line-1"></div>
              <span>OR</span>
              <div className="sep-line-2"></div>
            </div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className={'form-group'}>
                <label htmlFor="email" className="form-group__label">
                  Email
                </label>
                <input
                  {...register('email', { required: 'This field is required' })}
                  className="form-group__control"
                />
                {errors?.email?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <SizedBox mt={27} />
              <div className={'form-group'}>
                <label
                  htmlFor="password"
                  className="form-group__label sign-in__label"
                >
                  Password
                  <Link to={'/forgot-password'}>Forgot password?</Link>
                </label>
                <div className="form-group__password-input">
                  <input
                    {...register('password', {
                      required: 'This field is required',
                    })}
                    type="password"
                    className={'form-group__control'}
                  />
                </div>
                {errors?.password?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <SizedBox mt={35} />
              <button
                type="submit"
                className={`btn ${isDisabled ? 'btn--disabled' : ''}`}
              >
                {loginData.isLoading || googleLoginData.isLoading ? (
                  <CircularProgress sx={{ color: '#fff' }} size={27} />
                ) : (
                  <>Login</>
                )}
              </button>
              <div className="auth-center__bottom-label">
                Don’t have an account?
                <Link to="/sign-up"> Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default SignIn;
