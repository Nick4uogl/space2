import { useEffect, useState } from 'react';

import { Modal, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Select, { components } from 'react-select';

import {
  selectStyles,
  inviteTeamSelectStyles,
  anyoneWithTheLinkSelectStyles,
} from './SharingModalStyles';
import SharingTile from './SharingTile';
import { ReactComponent as CheckMark } from '../../assets/img/icons/checkmark.svg';
import { ReactComponent as Close } from '../../assets/img/icons/close.svg';
import { ReactComponent as CopyIcon } from '../../assets/img/icons/copyLink.svg';
import { ReactComponent as LinkSvg } from '../../assets/img/icons/link.svg';
import noImageSvg from '../../assets/img/noname.svg';
import {
  CAN_CLONE,
  CAN_VIEW,
  CAN_CLONE_AND_SHARE,
  RESTRICT_TO_NOT_SHARED,
} from '../../constants/sharePermissions';
import {
  usePostNetworkShareMutation,
  usePatchNetworkShareMutation,
  useGetNetworkSharesQuery,
} from '../../redux/networks/networksApiSlice';
import {
  changeIsPublic,
  selectNetworks,
} from '../../redux/networks/networksSlice';
import { selectUser } from '../../redux/user/userSlice';
import DropdownIndicator from '../DropDownIndicator/DropDownIndicator';
import './sharingModal.scss';

const sharingOptions = [
  {
    value: CAN_VIEW,
    label: 'Can view',
  },
  { value: CAN_CLONE, label: 'Can duplicate' },
  { value: CAN_CLONE_AND_SHARE, label: 'Can duplicate/share' },
];

const overAllOptions = [
  {
    value: CAN_VIEW,
    label: 'Anyone with the link',
  },
  {
    value: RESTRICT_TO_NOT_SHARED,
    label: 'Only people invited to this network ',
  },
];

const teamsOptions = [
  {
    value: 'Arne’s Cereals Premium team',
    label: 'Arne’s Cereals Premium teamdfghdfhgbgngjnhg',
  },
  { value: 'option2', label: 'Arne’s Cereals Premium team' },
  { value: 'option3', label: 'Arne’s Cereals Premium team' },
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

function SharingModal({
  networkId,
  open,
  handleClose,
  refetchNetworkShares,
  refetchNetwork,
  currentNetwork,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: 'all' });
  const network =
    useSelector(selectNetworks)?.find((network) => network.id === networkId) ??
    currentNetwork;
  const [isReadOnly, setIsReadOnly] = useState({
    value: CAN_VIEW,
    label: 'Can view',
  });
  const [onlyInvitedPeople, setOnlyInvitedPeople] = useState(
    network?.overall_permission === RESTRICT_TO_NOT_SHARED
      ? {
          value: RESTRICT_TO_NOT_SHARED,
          label: 'Only people invited to this network ',
        }
      : {
          value: CAN_VIEW,
          label: 'Anyone with the link',
        },
  );
  const [anyoneWithTheLink, setAnyoneWithTheLink] = useState(
    network?.overall_permission === CAN_VIEW
      ? {
          value: CAN_VIEW,
          label: 'Can view',
        }
      : network?.overall_permission === CAN_CLONE
      ? {
          value: CAN_CLONE,
          label: 'Can duplicate',
        }
      : network?.overall_permission === CAN_CLONE_AND_SHARE
      ? {
          value: CAN_CLONE_AND_SHARE,
          label: 'Can duplicate/share',
        }
      : '',
  );
  const [activeTab, setActiveTab] = useState('invite someone');
  const [selectedTeam, setSelectedTeam] = useState();
  const [shareTeam, setShareTeam] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [postNetworkShare, postNetworkShareResponse] =
    usePostNetworkShareMutation();
  const [patchNetworkShare] = usePatchNetworkShareMutation();
  const networkSharesResponse = useGetNetworkSharesQuery(networkId);
  const networkSharesErr = networkSharesResponse?.error?.data;
  const shareNetworkErr = postNetworkShareResponse?.error?.data;
  const networkShares = networkSharesResponse?.data?.[0]?.users;
  const networkOwner = networkSharesResponse?.data?.[0]?.network_owner;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleIsReadOnly = (selectedOption) => {
    setIsReadOnly(selectedOption);
  };

  const computeError = () => {
    if (networkSharesErr) {
      return networkSharesErr?.error;
    } else if (shareNetworkErr) {
      return shareNetworkErr?.user?.error
        ? shareNetworkErr.user.error
        : shareNetworkErr?.error
        ? shareNetworkErr?.error
        : 'share error';
    }
  };

  const handleAnyoneWithTheLinkChange = async (selected) => {
    const response = await patchNetworkShare({
      data: {
        overall_permission: selected.value,
      },
      id: networkId,
    });
    if (response?.data === 'OK') {
      setAnyoneWithTheLink(selected);
    }
  };

  const handleOnlyInvitedPeopleChange = async (selected) => {
    const response = await patchNetworkShare({
      data: {
        overall_permission: selected.value,
      },
      id: networkId,
    });
    if (response?.data === 'OK') {
      setOnlyInvitedPeople(selected);
      if (refetchNetwork) {
        refetchNetwork();
      }
      dispatch(
        changeIsPublic({
          id: networkId,
          value: selected.value === CAN_VIEW ? true : false,
        }),
      );
      if (selected.value === CAN_VIEW) {
        setAnyoneWithTheLink({
          value: CAN_VIEW,
          label: 'Can view',
        });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await postNetworkShare({
        user: data.email,
        network: networkId,
        permission: isReadOnly.value,
        notify_user: true,
      }).unwrap();
      networkSharesResponse.refetch();
      refetchNetworkShares();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (network?.is_public) {
      setOnlyInvitedPeople({
        value: CAN_VIEW,
        label: 'Anyone with the link',
      });
    } else {
      setOnlyInvitedPeople({
        value: RESTRICT_TO_NOT_SHARED,
        label: 'Only people invited to this network ',
      });
    }
  }, [network]);

  console.log('networkshares', networkShares);
  console.log('user', user);

  return (
    <Modal open={open} onClose={handleClose} className="sharing-modal-wrapper">
      <div>
        <div className="sharing-modal">
          <div className="sharing-modal__top">
            <h2>Share your network</h2>
            <button onClick={handleClose}>
              <Close fill="#121212" />
            </button>
          </div>
          <div className="sharing-modal__content">
            <div className="sharing-modal__tabs">
              <button
                onClick={() => setActiveTab('invite someone')}
                className={`sharing-modal__tab ${
                  activeTab === 'invite someone'
                    ? 'sharing-modal__tab--active'
                    : ''
                }`}
              >
                Invite someone
              </button>
              <button
                onClick={() => setActiveTab('invite team')}
                className={`sharing-modal__tab ${
                  activeTab === 'invite team'
                    ? 'sharing-modal__tab--active'
                    : ''
                }`}
              >
                Invite team
              </button>
            </div>
            {activeTab === 'invite someone' ? (
              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="sharing-modal__form"
              >
                <div className="sharing-modal__email">
                  <input
                    className="textfield"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter email to invite"
                  />
                  <Select
                    options={sharingOptions}
                    value={isReadOnly}
                    onChange={handleIsReadOnly}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: DropdownIndicator,
                      Option: CustomOption,
                    }}
                    styles={{
                      ...selectStyles,
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        position: 'absolute',
                        top: '0.4063rem',
                        right: '0.625rem',
                      }),
                    }}
                  />
                </div>
                <button
                  className={`btn ${
                    errors?.email || !watch('email')
                      ? 'sharing-modal__btn--disabled'
                      : ''
                  }`}
                  type="submit"
                >
                  {postNetworkShareResponse.isLoading ? (
                    <CircularProgress
                      size={25}
                      sx={{
                        color: '#fff',
                      }}
                    />
                  ) : (
                    'Send invite'
                  )}
                </button>
                <div className="sharing-modal__email-error error">
                  {errors?.email ? errors?.email?.message : computeError()}
                </div>
              </form>
            ) : (
              <div className="invite-sharing">
                <div className="invite-sharing__form flex-align-center">
                  <Select
                    options={teamsOptions}
                    {...register('team')}
                    onChange={(selected) => setValue('team', selected.value)}
                    placeholder="Choose a team"
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: DropdownIndicator,
                    }}
                    styles={inviteTeamSelectStyles}
                  />
                  <button
                    className={`btn ${
                      !watch('team') ? 'invite-sharing__btn--disabled' : ''
                    }`}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}

            <div className="sharing-modal__shares">
              {user?.id === network?.owner?.id && (
                <div className="sharing-modal__tile tile-sharing">
                  <div className="tile-sharing__left tile-sharing__anyone">
                    <LinkSvg />
                    <Select
                      options={overAllOptions}
                      value={onlyInvitedPeople}
                      onChange={handleOnlyInvitedPeopleChange}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: DropdownIndicator,
                        Option: CustomOption,
                      }}
                      styles={anyoneWithTheLinkSelectStyles}
                    />
                  </div>
                  <div>
                    {onlyInvitedPeople.value !== RESTRICT_TO_NOT_SHARED && (
                      <Select
                        options={sharingOptions}
                        value={anyoneWithTheLink}
                        onChange={handleAnyoneWithTheLinkChange}
                        components={{
                          IndicatorSeparator: () => null,
                          DropdownIndicator: DropdownIndicator,
                          Option: CustomOption,
                        }}
                        styles={selectStyles}
                      />
                    )}
                  </div>
                </div>
              )}

              {networkSharesResponse?.isLoading ? (
                <CircularProgress
                  size={25}
                  sx={{
                    color: '#51CE7B',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              ) : (
                <>
                  {user?.id != networkOwner?.id && networkOwner && (
                    <div className="sharing-modal__tile tile-sharing">
                      <div className="tile-sharing__left">
                        <img
                          src={
                            networkOwner?.image
                              ? `data:image/png;base64, ${networkOwner?.image}`
                              : noImageSvg
                          }
                          alt={`${networkOwner?.username} avatar`}
                        />
                        {networkOwner?.username}
                      </div>
                      <div className="sharing-modal__owner">Owner</div>
                    </div>
                  )}
                  {networkShares?.map((share) => {
                    return (
                      <SharingTile
                        key={share?.user?.id + 'sharetile'}
                        share={share}
                        networkId={networkId}
                        networkShares={networkShares}
                        isOwner={networkOwner?.id === user?.id}
                        refetchNetworkShares={networkSharesResponse?.refetch}
                        userId={user?.id}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="sharing-modal__footer">
            <button
              className="sharing-modal__copy-link flex-align-center"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${import.meta.env.VITE_FRONTEND_URL}network/${networkId}`,
                );
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1500);
              }}
            >
              <CopyIcon />
              {!isCopied ? 'Copy link' : 'Copied'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SharingModal;
