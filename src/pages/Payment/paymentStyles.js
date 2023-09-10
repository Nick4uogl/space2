export const choosePaymentSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    outline: 'none',
    marginBottom: '1.5rem',
    border: '1px solid #BDC5CE',
    padding: '0.65rem 1.25rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#51CE7B',
    },
    boxShadow: state.isFocused ? '0 0 0 2px 51CE7B' : '',
    gap: '0.375rem',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    padding: '1rem',
    position: 'relative',
    borderRadius: '0.375rem',
    fontWeight: '700',
    color: '#000',
    opacity: state.isDisabled && '0.3',
    backgroundColor: state.isFocused ? '#F7F8F9' : 'transparent',
    '&:hover': {
      backgroundColor: '#F7F8F9',
    },
    '&:active': {
      backgroundColor: state.isDisabled
        ? 'transparent'
        : 'rgba(81, 206, 123, 0.5)',
    },
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: '0px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '1rem',
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Nexa',
    lineHeight: '125%',
    letterSpacing: '-0.01rem',
    padding: '0px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0px',
  }),
  menu: (provided) => ({
    ...provided,
    padding: '0.5rem',
  }),
};
