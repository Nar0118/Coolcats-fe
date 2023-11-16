import React, {useContext} from 'react';
import {NavLink, Route} from "react-router-dom";

// Context
import logo from "../static/images/logo-white.png";
import {UserContext} from "../context/UserContext";
import MegaMenu from "./MegaMenu";
import LoginButton from "./Login/LoginButton";
import TabletButton from "./Login/TabletButton";
import Container from './Container';
import ErrorMessage from "./ErrorMessage";

export default function Nav() {
  const {  menuOpen, setMenuOpen, setCoolTabletOpen } = useContext(UserContext);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  const closeOpenPanels = () => {
    setMenuOpen(false);
    setCoolTabletOpen(false);
  }

  return (
    <>
      <div className="menu-section menu-left">
        <NavLink key="home" activeClassName="is-active" exact to="/" onClick={closeOpenPanels}><img className="logo" src={logo} /></NavLink>
        <MegaMenu />
      </div>
      <div className="menu-section menu-right">
        <TabletButton />
        <LoginButton />
        <ErrorMessage />
        <button className="menu-button" type="button" onClick={toggleMenuOpen}>
          <Container id='hamburger' states={ [{ condition: menuOpen, className: 'open'}] }>
            <span></span>
            <span></span>
            <span></span>
          </Container>
        </button>
      </div>
    </>
  );
}