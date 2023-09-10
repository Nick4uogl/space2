import knetMinerLogo from '../../assets/img/auth/KnetMiner_logo.svg';
import './authLeft.scss';

function AuthLeft() {
  return (
    <div className="auth-left">
      <img src={knetMinerLogo} alt="knetminer logo" />
      <p>Tell the stories of complex traits and diseases</p>
    </div>
  );
}

export default AuthLeft;
