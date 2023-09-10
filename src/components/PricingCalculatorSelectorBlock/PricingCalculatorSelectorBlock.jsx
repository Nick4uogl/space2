import './pricingCalculatorSelectorBlock.scss';

const PricingCalculatorSelectorBlock = ({
  switched,
  setValue,
  title,
  firstOption,
  secondOption,
  firstOptionDiscount,
  secondOptionDiscount,
}) => {
  return (
    <div className="pricing-calculator-selector">
      <h2 className="pricing-calculator-selector__title">{title}</h2>
      <div
        className={`switch-selector switch-selector--user ${
          switched && 'switch-selector-switched'
        }`}
      >
        <button
          onClick={() => setValue(false)}
          className={`switch-selector-option ${
            !switched && 'switch-selector-option--active'
          }`}
        >
          {firstOption}
          {firstOptionDiscount ? (
            <span className="switch-selector__discount">
              -{firstOptionDiscount}%
            </span>
          ) : null}
        </button>
        <button
          onClick={() => setValue(true)}
          className={`switch-selector-option ${
            switched && 'switch-selector-option--active'
          }`}
        >
          {secondOption}
          {secondOptionDiscount ? (
            <span className="switch-selector__discount">
              -{secondOptionDiscount}%
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default PricingCalculatorSelectorBlock;
