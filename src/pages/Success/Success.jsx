import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import './success.scss';

const Success = () => {
  return (
    <div className="success-page">
      <Header />
      <div className="success-page__wrapper">
        <div className="success-page__container">
          <h1 className="success-page__title">
            Thank you! We will email you an invoice and payment details shortly.
          </h1>
          <p className="success-page__subtitle">
            Please reply to us via email or contact us when you&aposve
            successfully paid.
          </p>
          <Link to={'/resources'} className="success-page__link btn">
            GO TO RESOURCES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
