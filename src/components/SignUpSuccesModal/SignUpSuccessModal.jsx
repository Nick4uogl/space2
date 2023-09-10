import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Fade } from "@mui/material";
import mail from "../../assets/img/auth/mail.svg";
import close from "../../assets/img/auth/close.svg";

import "./signUpSuccessModal.scss";
export default function SignUpSuccessModal(props) {
  const { openModal } = props;
  const [open, setOpen] = useState(openModal);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="The letter with instructions has been sent!"
        aria-describedby="Please check your email, if u have not received email please check spam"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className="mail-send">
            <div className="mail-send__close">
              <button onClick={handleClose}>
                <img src={close} alt="" />
              </button>
            </div>

            <h2>Instructions sent!</h2>
            <p>Please check your email and spam folder</p>
            <img className="mail-send__mail" src={mail} alt="" />
            <button onClick={handleClose} className="btn mail-send__btn">
              Got it!
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
