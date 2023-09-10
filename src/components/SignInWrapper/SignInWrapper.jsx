import CookieConsent from 'react-cookie-consent';

import classes from './SignInWrapper.module.scss';

function SignInWrapper({ children }) {
  return (
    <div className={classes['sign-in-wrapper']}>
      <div className={classes['sign-in-wrapper__container']}>{children}</div>

      <CookieConsent
        location="bottom"
        buttonText="Agree"
        cookieName="cookieConsent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies. By using and further navigating this website
        you accept this. Detailed information about the use of cookies on this
        website is available by clicking on{' '}
        <a href="https://www.rothamsted.ac.uk/privacy-and-cookies">
          more information
        </a>
        .
      </CookieConsent>
    </div>
  );
}

export default SignInWrapper;
