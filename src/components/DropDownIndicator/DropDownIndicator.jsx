import { components } from 'react-select';

import { ReactComponent as ArrowDown } from '../../assets/img/icons/arrowDown.svg';
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
