import { useEffect, useState } from 'react';

import { Modal } from '@mui/material';
import './editModal.scss';

const EditModal = ({ open, handleClose, title, value }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose(inputValue)}
      className="network-edit-modal"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
      }}
    >
      <div className="network-edit-modal__content">
        <h2 className="network-edit-modal__title">{title}</h2>
        <form onSubmit={onSubmit}></form>
        <textarea
          className="network-edit-modal__input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyPress={() => {
            if (event.key === 'Enter') {
              handleClose(inputValue);
            }
          }}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
