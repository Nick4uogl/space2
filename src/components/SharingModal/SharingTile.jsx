import { useState } from 'react';

import Select, { components } from 'react-select';

import { selectStyles } from './SharingModalStyles';
import { ReactComponent as CheckMark } from '../../assets/img/icons/checkmark.svg';
import noImageSvg from '../../assets/img/noname.svg';
import {
  CAN_CLONE,
  CAN_VIEW,
  CAN_CLONE_AND_SHARE,
} from '../../constants/sharePermissions';
import { usePatchNetworkShareMutation } from '../../redux/networks/networksApiSlice';
import DropdownIndicator from '../DropDownIndicator/DropDownIndicator';

const sharingOptions = [
  {
    value: CAN_VIEW,
    label: 'Can view',
  },
  { value: CAN_CLONE, label: 'Can duplicate' },
  { value: CAN_CLONE_AND_SHARE, label: 'Can duplicate/share' },
];

const CustomOption = (props) => (
  <components.Option {...props}>
    {props.isSelected && (
      <CheckMark
        style={{
          position: 'absolute',
          top: '0.3125rem',
          left: '0.625rem',
          width: '0.9375rem',
          height: '0.9375rem',
        }}
      />
    )}

    {props.label}
  </components.Option>
);

const SharingTile = ({
  share,
  networkId,
  networkShares,
  isOwner,
  refetchNetworkShares,
  userId,
}) => {
  const [optionValue, setOptionValue] = useState({
    value: share?.permission,
    label:
      share?.permission === CAN_CLONE
        ? 'Can duplicate'
        : share?.permission === CAN_VIEW
        ? 'Can view'
        : share?.permission === CAN_CLONE_AND_SHARE
        ? 'Can duplicate/share'
        : '',
  });
  const [patchNetworkShare] = usePatchNetworkShareMutation();

  const handleEditChange = async (selected) => {
    const response = await patchNetworkShare({
      data: {
        user_permissions: [
          ...networkShares.map((user) => {
            return {
              user: user?.user?.username,
              permission: user.permission,
            };
          }),
          {
            user: share.user?.username,
            permission: selected.value,
          },
        ],
      },
      id: networkId,
    });
    const userShare = response?.data?.users?.find(
      (networkShare) => networkShare?.user?.id === share?.user?.id,
    );
    setOptionValue({
      value: userShare?.permission,
      label:
        userShare?.permission === CAN_CLONE
          ? 'Can duplicate'
          : userShare?.permission === CAN_VIEW
          ? 'Can view'
          : 'Can duplicate/share',
    });
    refetchNetworkShares();
  };

  const isChangeUserPersmissionPermitted = share?.shared_by === userId;

  return (
    <div className="sharing-modal__tile tile-sharing">
      <div className="tile-sharing__left">
        <img
          src={
            share.user?.image
              ? `data:image/png;base64, ${share.user?.image}`
              : noImageSvg
          }
          alt={`${share.user?.username} avatar`}
        />
        {share.user?.full_name}
      </div>
      <div>
        <Select
          options={sharingOptions}
          value={optionValue}
          isDisabled={isOwner ? false : true}
          onChange={handleEditChange}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: DropdownIndicator,
            Option: CustomOption,
          }}
          styles={selectStyles}
        />
      </div>
    </div>
  );
};

export default SharingTile;
