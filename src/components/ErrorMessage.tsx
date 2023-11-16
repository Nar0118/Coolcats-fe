import React from "react";
import { AuthContext } from '../context/Auth';
import { StatusContext, EnumStatus } from "../context/Status";

export default function ErrorMessage() {
  const { networkId, isCorrectNetwork } = React.useContext(AuthContext);
  const { isStatus } = React.useContext(StatusContext);

  // Hide component if network id isnt set.
  if (networkId === null) {
    return null;
  }

  if (!isCorrectNetwork()
    || isStatus(EnumStatus.NETWORK_ERROR)
  ) {
    return (
      <p className="error-message">Switch to the<br />{ networkName(process.env.REACT_APP_NETWORKID) } network.</p>
    );
  }

  return null;
}

function networkName(id: any) {
  switch (String(id)) {
    case '1':
      return 'Main';
    case '3':
      return 'Ropsten';
    case '4':
      return 'Rinkeby';
    case '5':
      return 'Goerli';
    case '42':
      return 'Kovan';
    case 'localhost':
      return 'localhost';
    default:
      return 'local';
  }
}