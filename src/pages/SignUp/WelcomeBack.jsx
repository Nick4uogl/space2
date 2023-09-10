import { useState } from "react";
import SignInWrapper from "../../components/SignInWrapper/SignInWrapper";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { Checkbox } from "@mui/material";
import SizedBox from "../../lib/SizedBox/SizedBox";
import classes from "./completeSignUp.module.scss";

function WelcomeBack() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleIsComplete = () => {
    setIsComplete(!isComplete);
  };

  const isAgreedHandleChange = () => {
    setIsAgreed(!isAgreed);
  };

  const subscribeHandleChange = () => {
    setIsSubscribe(!isSubscribe);
  };

  const handleSubmit = () => {};

  return (
    <SignInWrapper>
      <AuthWrapper>
        <div className={`auth-page`}>
          <div className="auth-center">
            <div className="auth-center__top">
              <p className="auth-title">We need a bit more info...</p>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group-container">
                <div className={`form-group`}>
                  <label htmlFor="first-name" className="form-group__label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-group__control"
                    value={firstName}
                    name="first-name"
                    onChange={(ev) => setFirstName(ev.target.value)}
                  />
                </div>
                <div className={`form-group`}>
                  <label htmlFor="last-name" className="form-group__label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-group__control"
                    value={lastName}
                    name="last-name"
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                </div>
              </div>

              <div
                className={`form-group ${classes["complete-sign-up-form-group"]}`}
              >
                <label htmlFor="organisation" className="form-group__label">
                  Organisation
                </label>
                <div className="form-group__password-input">
                  <input
                    className={`form-group__control`}
                    value={organization}
                    name="organisation"
                    onChange={(ev) => setOrganization(ev.target.value)}
                  />
                </div>
              </div>
              <SizedBox mt={20} />
              <div
                className={classes["complete-sign-up-check"]}
                style={{ display: "flex" }}
              >
                <Checkbox
                  checked={isAgreed}
                  onChange={isAgreedHandleChange}
                  className={classes["complete-sign-up-checkbox"]}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <label htmlFor="checkbox">
                  I agree with Terms & Conditions and Data Privacy Policy
                </label>
              </div>
              <SizedBox mt={8} />
              <div
                className={classes["complete-sign-up-check"]}
                style={{ display: "flex" }}
              >
                <Checkbox
                  checked={isSubscribe}
                  onChange={subscribeHandleChange}
                  className={classes["complete-sign-up-checkbox"]}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <label htmlFor="checkbox">Subscribe to newsletter</label>
              </div>

              <button
                type="button"
                className={`btn ${classes["complete-sign-up__button"]}`}
                onClick={handleIsComplete}
              >
                Update account
              </button>
            </form>
          </div>
        </div>
      </AuthWrapper>
    </SignInWrapper>
  );
}

export default WelcomeBack;
