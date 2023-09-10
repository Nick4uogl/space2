import { IconButton, Modal, Button } from '@mui/material';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';

const CancelModal = ({
  openCancelSubscription,
  handleCloseCancelSubscription,
  cancelSubscription,
  title,
  subtitle,
  btnText,
}) => {
  return (
    <Modal
      className="cancel-subscription-modal"
      open={openCancelSubscription}
      onClose={handleCloseCancelSubscription}
    >
      <div className="cancel-subscription-modal__container">
        <div className="cancel-subscription-modal__header">
          <IconButton onClick={handleCloseCancelSubscription}>
            <CloseIcon fill="#121212" />
          </IconButton>
        </div>
        <h2 className="heading-2 cancel-subscription-modal__title">{title}</h2>
        {subtitle && (
          <p className="cancel-subscription-modal__subtitle">{subtitle}</p>
        )}

        <Button
          variant="contained"
          className="cancel-subscription-modal__btn"
          onClick={cancelSubscription}
        >
          {btnText}
        </Button>
      </div>
    </Modal>
  );
};

export default CancelModal;
