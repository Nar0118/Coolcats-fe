import React, {useContext} from 'react';
import CoolTablet from "../CoolTablet/CoolTablet";
import Nav from "../Nav";
import { AuthContext } from '../../context/Auth';

function DashboardBar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="dashboard-bar">
      {
        isLoggedIn && (
          <div className="inner-dashboard-bar inner-dashboard-bar-logged-in">
            <Nav />
            <CoolTablet />
          </div>
      )}
      {!isLoggedIn && (
        <div className="inner-dashboard-bar inner-dashboard-bar-logged-out">
          <Nav />
        </div>
      )}
    </div>
  );
}

export default DashboardBar;