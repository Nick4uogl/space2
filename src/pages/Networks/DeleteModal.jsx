import { Modal } from '@mui/material';
import './deleteModal.scss';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as DeletedIcon } from '../../assets/img/icons/deleted.svg';

const DeleteModal = ({ open, handleClose, title, subtitle }) => {
  return (
    <Modal open={open} onClose={handleClose} className="delete-popup">
      <div className="delete-popup__container">
        <div className="delete-popup__top">
          <CloseIcon fill="#121212" />
        </div>
        <div className="delete-popup__icon-deleted">
          <DeletedIcon />
        </div>
        <h2 className="delete-popup__title">{title}</h2>
        <p className="delete-popup__subtitle">{subtitle}</p>
        <button onClick={handleClose} className="btn delete-popup__btn">
          OK
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
