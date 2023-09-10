import { useRef } from 'react';

import { IconButton } from '@mui/material';
import Select from 'react-select';

import { ReactComponent as Search } from '../../assets/img/icons/Search.svg';
import DropdownIndicator from '../../components/DropDownIndicator/DropDownIndicator.jsx';

const options = [
  { value: 'descending', label: 'descending' },
  { value: 'ascending', label: 'ascending' },
];

const ResourcesTop = ({
  searchQuery,
  handleSearchQuery,
  selectedOption,
  handleSortByOption,
}) => {
  const searchInputRef = useRef(null);

  return (
    <div className="main-resources__top flex-space">
      <div className="main-resources__search">
        <IconButton
          onClick={() =>
            searchInputRef.current && searchInputRef.current.focus()
          }
          sx={{ position: 'absolute', top: '2px', left: '3px' }}
        >
          <Search width="20" height="20" />
        </IconButton>
        <input
          ref={searchInputRef}
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <Select
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: DropdownIndicator,
        }}
        defaultValue={selectedOption}
        onChange={handleSortByOption}
        options={options}
        placeholder="Sort by date"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '#51CE7B' : '#BDC5CE',
            outlineColor: '#51CE7B',
            width: '127px',
            borderRadius: '8px',
            boxShadow: state.isFocused ? '0 0 0 2px 51CE7B' : '',
            '&:hover': {
              borderColor: state.isFocused ? '51CE7B' : baseStyles.borderColor, // Keep the focus color on hover
            },
          }),
          option: (provided, state) => ({
            ...provided,
            background: state.isFocused
              ? '#94e0ad' // Change the background color on focus
              : state.isSelected
              ? '#33de6c'
              : state.isHovered
              ? '#33de6c'
              : '#fff',
            '&:hover': {
              backgroundColor: state.isSelected ? '#33de6c' : '#b2ebc5',
            },
            color: state.isSelected
              ? 'white' // Change the text color of the selected option
              : state.isHovered
              ? 'white'
              : provided.color, // Change the text color on hover
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            padding: '6px',
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: '13px',
            fontWeight: '700',
            color: '#121212',
            fontFamily: 'Nexa',
          }),
        }}
      />
    </div>
  );
};

export default ResourcesTop;
