import React, { useContext } from 'react';
import coolPadIcon from "../../static/images/icons/cool-pad.png";
import coolPadIconOpen from "../../static/images/icons/cool-pad-open.png";
import {UserContext} from "../../context/UserContext";
import { AuthContext } from '../../context/Auth';

export default function TabletButton() {
  const { coolTabletOpen, setCoolTabletOpen } = useContext(UserContext);
  const { networkId, isLoggedIn } = useContext(AuthContext);

  const toggleLoggedInWidget = () => {
    setCoolTabletOpen(!coolTabletOpen);
  }

  if (!isLoggedIn
    || networkId !== process.env.REACT_APP_NETWORKID  
  ) {
    return null;
  }

  return (
    <button className="cool-pad-button" type="button" onClick={ toggleLoggedInWidget }>
      { !coolTabletOpen && <img src={ coolPadIcon } alt="User Profile" /> }
      { coolTabletOpen && <img src={ coolPadIconOpen } alt="User Profile" /> }
    </button>
  );
}
