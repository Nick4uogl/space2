import { useState, useEffect } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import SignInWrapper from '../../components/SignInWrapper/SignInWrapper';
import SizedBox from '../../lib/SizedBox/SizedBox';
import { useDecodeGoogleTokenMutation } from '../../redux/auth/authApiSlice';
import {
  setUserSignUpData,
  selectUserSignUpData,
} from '../../redux/user/userSlice';
import {
  validatePassword,
  validateConfirmPassword,
  validateEmail,
} from '../../utils/validators';

import classes from './signUp.module.scss';

function SignUp() {
  const userData = useSelector(selectUserSignUpData);
  const [close, setClose] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [decodeGoogleToken, decodeGoogleTokenResponse] =
    useDecodeGoogleTokenMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'all' });

  const onSubmit = async (data) => {
    dispatch(
      setUserSignUpData({
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
        google_auth: false,
      }),
    );
    navigate('/complete-sign-up');
  };

  console.log(decodeGoogleTokenResponse);

  const googleSuccess = async (credentialResponse) => {
    try {
      const response = await decodeGoogleToken(
        credentialResponse.credential,
      ).unwrap();
      dispatch(
        setUserSignUpData({
          ...response,
          google_auth: true,
        }),
      );
      navigate('/complete-sign-up');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    setError('Something went wrong signing up with google');
  };

  useEffect(() => {
    if (error) {
      setClose(false);
    }
  }, [error]);

  return (
    <SignInWrapper>
      <AuthWrapper error={error ? error : ''} close={close} setClose={setClose}>
        <div className={`${classes['sign-up-page']}} auth-page`}>
          <div className="auth-center">
            <div className={classes['sign-up__top']}>
              <p className="auth-title">Sign up to KnetMiner</p>
              <GoogleLogin
                className="google-auth-btn"
                onSuccess={googleSuccess}
                onError={googleFailure}
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
              <div className={`form-group ${classes['sign-up-form-group']}`}>
                <label htmlFor="email" className="form-group__label">
                  Email
                </label>
                <input
                  {...register('email', validateEmail)}
                  type="text"
                  defaultValue={userData?.email}
                  className="form-group__control"
                  name="email"
                />
                <SizedBox mt={27} />
                {errors?.email?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className={`form-group ${classes['sign-up-form-group']}`}>
                <label htmlFor="password" className="form-group__label">
                  Password
                </label>
                <div className="form-group__password-input">
                  <input
                    type="password"
                    defaultValue={userData?.password}
                    className={`form-group__control ${classes['sign-up__password']}`}
                    {...register('password', validatePassword)}
                    name="password"
                  />
                </div>
                <SizedBox mt={27} />
                {errors?.password?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className={`form-group ${classes['sign-up-form-group']}`}>
                <label
                  htmlFor="confirmPassword"
                  className="form-group__label form-group__label--m"
                >
                  Confirm passwrod
                </label>
                <div className="form-group__password-input">
                  <input
                    defaultValue={userData?.confirm_password}
                    {...register('confirmPassword', validateConfirmPassword)}
                    type="password"
                    className={`form-group__control  ${classes['sign-up__password']}`}
                  />
                </div>
                <SizedBox mt={37} />
                {errors?.confirmPassword?.message && (
                  <p className="form-group__error-input form-group__error">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`btn  ${classes['sign-up__button']} ${
                  (!watch('email') ||
                    !watch('password') ||
                    !watch('confirmPassword')) &&
                  'btn--disabled'
                }`}
              >
                Continue
              </button>
              <div className={classes['sign-up__login-label']}>
                Already a member?
                <Link to="/sign-in"> Log In.</Link>
              </div>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default SignUp;
