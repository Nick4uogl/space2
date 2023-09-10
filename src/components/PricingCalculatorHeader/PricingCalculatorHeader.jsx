import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
import { ButtonLink } from '../../styles/muiComponentsStyles';
import './pricingCalculatorHeader.scss';

const PricingCalculatorHeader = ({ title, subtitle, backLink }) => {
  const navigate = useNavigate();

  return (
    <div className="pricing-calculator-header">
      <div className="pricing-calculator-header__left">
        <h2 className="pricing-calculator-header__title">{title}</h2>
        <p className="pricing-calculator-header__subtitle">{subtitle}</p>
      </div>
      {backLink && (
        <ButtonLink
          className="pricing-calculator-header__back-link"
          onClick={() => navigate(-1)}
          sx={{ gap: '0.62rem' }}
        >
          <ArrowLeft fill="#121212" width="16" height="16" /> {backLink}
        </ButtonLink>
      )}
    </div>
  );
};

export default PricingCalculatorHeader;
