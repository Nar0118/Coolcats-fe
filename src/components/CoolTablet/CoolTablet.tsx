import React, {useContext, useEffect} from 'react';
import CoolTabletScreen from "./CoolTabletScreen";
import Container from "../Container";
import {UserContext} from "../../context/UserContext";

function CoolTablet() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.coolTabletOpen) {
      // Shut other windows when the menu is opened
      userContext.setProfileOpen(false);
      userContext.setMenuOpen(false);
      userContext.setNewsOpen(false);
    }
  }, [userContext.coolTabletOpen]);

  return (
    <Container className='cool-tablet' states={ [{ condition: userContext.coolTabletOpen, className: 'show'}] }>
      <CoolTabletScreen />
    </Container>
  );
}

export default CoolTablet;