import { useEffect, useState } from "react";
import classes from "./popup.module.scss";

function Popup({ openModal, successMessage, errorMessage, absolute }) {
  const [open, setOpen] = useState(openModal);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={`${classes["popup"]} ${
        successMessage ? classes["popup-success"] : classes["popup-error"]
      } ${open ? classes["popup-show"] : ""} ${
        absolute ? classes["popup-absolute"] : ""
      }`}
    >
      {successMessage ? successMessage : errorMessage}
      <button onClick={handleClose}>
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7727 3.96465L11.004 3.19922L7.95666 6.23379L4.90928 3.19922L4.14062 3.96465L7.188 6.99922L4.14062 10.0338L4.90928 10.7992L7.95666 7.76465L11.004 10.7992L11.7727 10.0338L8.72532 6.99922L11.7727 3.96465Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default Popup;
