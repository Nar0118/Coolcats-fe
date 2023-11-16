import { useContext } from 'react';
import { AuthContext } from "../../context/Auth";
import { useMetamask } from "use-metamask";
import Button from '../Button';
import { EnumStatus, StatusContext } from '../../context/Status';

export const Login = () => {
  const { login, isAuthenticated, isCorrectNetwork, networkId } = useContext(AuthContext);
  const { isStatus } = useContext(StatusContext);
  const { metaState } = useMetamask();
  const disabled = isStatus(EnumStatus.GETTING_NONCE) 
    || isStatus(EnumStatus.AUTHENTICATING) 
    || isStatus(EnumStatus.LOGGING_OUT) 
    || isStatus(EnumStatus.SIGNING_DATA);

  let btnText = 'Connect';
  let btnClass = 'connect';

  if (isStatus(EnumStatus.GETTING_NONCE)) {
    btnText = 'Please wait...';
    btnClass = 'please-wait';
  }
  if (isStatus(EnumStatus.SIGNING_DATA)) {
    btnText = 'Please Check Your Wallet';
    btnClass = 'check-metamask';
  }

  // Check to see if meta mask is installed
  if (!metaState.isAvailable) {
    return null;
  }

  // Hide button if wrong network
  if (networkId && !isCorrectNetwork()) {
    return null;
  }

  // Hide if wrong network
  if (isStatus(EnumStatus.NETWORK_ERROR)) {
    return null;
  }

  // Hide button if already authenticated
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <Button className={btnClass} colour='login' disabled={ disabled } onClick={ login }>{ btnText }</Button>
  );
};

export default Login;