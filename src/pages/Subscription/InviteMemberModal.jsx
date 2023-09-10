import { IconButton, Modal } from '@mui/material';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as InfoIcon } from '../../assets/img/icons/info.svg';
import placeholderImg from '../../assets/img/noname.svg';

import './inviteMemberModal.scss';

const InviteMemberModal = ({
  open,
  handleClose,
  usedSeats,
  seatsCount,
  user,
  handleInviteMember,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'all' });

  return (
    <Modal className="invite-member-modal" open={open} onClose={handleClose}>
      <div className="invite-member-modal__container">
        <div className="invite-member-modal__header flex-space">
          <div className="invite-member-modal__title flex-align-center">
            Invite new member
            <InfoIcon fill="#121212" />
          </div>
          <IconButton sx={{ padding: '3px' }}>
            <CloseIcon onClick={handleClose} fill="#121212" />
          </IconButton>
        </div>
        <div className="invite-member-modal__main">
          <form
            className="invite-member-modal__form"
            onSubmit={handleSubmit(handleInviteMember)}
          >
            <textarea
              className="invite-member-modal__input"
              {...register('email')}
            ></textarea>
            <Button
              variant="contained"
              disableElevation
              className="input-btn"
              type="submit"
              disabled={!watch('email')}
              sx={{ flex: '0 1 8.75rem' }}
            >
              Invite
            </Button>
          </form>
          <div className="invite-member-modal__list">
            <div className="resource-subscription-member">
              <div className="flex-align-center">
                <img
                  src={
                    user?.image
                      ? `data:image/png;base64, ${user.image}`
                      : placeholderImg
                  }
                  alt=""
                />
                <p className="resource-subscription-member__name">
                  {user?.first_name} {user?.last_name} (You)
                </p>
              </div>
              <p className="txt-green">Owner</p>
            </div>
          </div>

          <div className="resource-subscription-seats invite-member-modal__seats">
            <div className="profile-subscription-resource-seats__line">
              <div
                className="profile-subscription-resource-seats__indicator"
                style={{ width: `calc(${usedSeats} / ${seatsCount} * 100%)` }}
              ></div>
            </div>
            <div className="profile-subscription-resource-seats__bottom">
              <div className="profile-subscription-resource-seats__bottom-left">
                Resource members
              </div>
              <div className="profile-subscription-resource-seats__count">
                {usedSeats} / {seatsCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteMemberModal;
