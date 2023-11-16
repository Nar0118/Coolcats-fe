import * as React from 'react';
import ShareButtons from './ShareButtons';
import FooterLogo from '../static/images/footer-logo.png';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function Footer() {
    const userContext = useContext(UserContext);

    const closeOpenPanels = () => {
        userContext.setMenuOpen(false);
        userContext.setCoolTabletOpen(false);
    }

  return (
    <section className="footer">
      <div className="inner-container">
        <NavLink key="index" activeClassName="is-active" exact to="/" onClick={closeOpenPanels}><img src={FooterLogo} alt="Cool Cats NFT" /></NavLink>
        <ShareButtons />
        <p className="copyright">
        </p>
      </div>
        <div className="terms-links">
            <NavLink key="terms-and-conditions" activeClassName="is-active" exact to="/terms-and-conditions" onClick={closeOpenPanels}>Terms &amp; Conditions</NavLink>&nbsp;|&nbsp;
            <NavLink key="privacy-policy" activeClassName="is-active" exact to="/privacy-policy" onClick={closeOpenPanels}>Privacy Policy</NavLink>&nbsp;|&nbsp;
            <NavLink key="competition-rules" activeClassName="is-active" exact to="/competition-rules" onClick={closeOpenPanels}>Competition Rules</NavLink>
        </div>
        <p className="copyright-two">&copy; 2021 Cool Cats LLC</p>
    </section>
  );
}
