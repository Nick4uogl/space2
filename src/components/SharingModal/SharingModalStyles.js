const controlStyles = {
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  padding: '0px',
  boxShadow: 'none',
};

const optionStyles = {
  fontSize: '0.8125rem',
  color: '#fff',
  cursor: 'pointer',
  paddingLeft: '1.875rem',
  position: 'relative',
  background: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

const dropdownIndicatorStyles = {
  padding: '0rem',
};

const valueContainerStyles = {
  padding: '0rem',
};

const placeholderStyles = {
  fontSize: '0.8125rem',
  fontWeight: '700',
  color: '#121212',
  fontFamily: 'Nexa',
  padding: '0rem',
};

const menuStyles = {
  margin: '0rem',
  borderRadius: '0rem 0.9375rem 0.9375rem 0.9375rem',
  boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.05)',
  width: '10.9375rem',
  backgroundColor: '#121212',
};

export const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    ...controlStyles,
    width: '100px',
  }),
  container: (baseStyles, state) => ({
    ...baseStyles,
  }),
  option: (provided, state) => ({
    ...provided,
    ...optionStyles,
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    ...dropdownIndicatorStyles,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    ...placeholderStyles,
  }),
  valueContainer: (provided) => ({
    ...provided,
    ...valueContainerStyles,
  }),
  menu: (provided) => ({
    ...provided,
    ...menuStyles,
  }),
};

export const inviteTeamSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: '100%',
    cursor: 'pointer',
    boxShadow: state.isFocused ? '0 0 0 2px 51CE7B' : '',
    padding: '0rem 0.75rem',
    borderRadius: '0.3125rem',
    border: '1px solid #6F7F8F',
    height: '100%',
    '&:hover': {
      borderColor: '#6F7F8F',
    },
  }),
  container: (baseStyles, state) => ({
    ...baseStyles,
    flex: '1 1 auto',
    height: '3.1rem',
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    color: '#121212',
    fontFamily: 'Nexa',
    fontWeight: '700',
  }),

  option: (provided, state) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#121212',
    cursor: 'pointer',
    fontFamily: 'Nexa',
    fontWeight: '700',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    backgroundColor: state.isSelected ? '#F7F8F9' : 'transparent',
    '&:hover': {
      backgroundColor: '#F7F8F9',
    },
    '&:active': {
      backgroundColor: '#F7F8F9',
    },
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    padding: '0px',
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    color: '#6F7F8F',
    fontWeight: '400',
    fontFamily: 'Nexa',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0px',
  }),
  menu: (provided) => ({
    ...provided,
    margin: '0px',
    right: '0px',
    top: 'calc(100% + 0.25rem)',
    left: 'auto',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    boxShadow: '0px 0.75rem 3.125rem 0px rgba(0, 0, 0, 0.08)',
    width: '15rem',
    backgroundColor: '#fff',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '5.75rem',
    scrollbarWidth: 'thin', // Customize the scrollbar width
    scrollbarColor: 'darkgray lightgray',
    paddingRight: '0.25rem',
    '::-webkit-scrollbar': {
      width: '4px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: '#F7F8F9',
      borderRadius: '0.25rem',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#6F7F8F',
      borderRadius: '0.25rem',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
};

export const anyoneWithTheLinkSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    ...controlStyles,
  }),
  option: (provided, state) => ({
    ...provided,
    ...optionStyles,
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    ...dropdownIndicatorStyles,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    ...placeholderStyles,
  }),
  valueContainer: (provided) => ({
    ...provided,
    ...valueContainerStyles,
  }),
  menu: (provided) => ({
    ...provided,
    ...menuStyles,
    width: '270px',
  }),
};
