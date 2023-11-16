import React, {useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import Container from './Container';

export default function MegaMenu() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.menuOpen) {
      // Shut other windows when the menu is opened
      userContext.setProfileOpen(false);
      userContext.setCoolTabletOpen(false);
      userContext.setNewsOpen(false);
    }
  }, [userContext.menuOpen]);

  const closeOpenPanels = () => {
    userContext.setMenuOpen(false);
    userContext.setCoolTabletOpen(false);
  }

  return (
    <Container className='mega-menu' states={ [{ condition: userContext.menuOpen, className: 'show' }]} elementType='nav'>
      <ul>
          <li className="heading">Cool Cats</li>
          <li><NavLink key="home" activeClassName="is-active" exact to="/" onClick={closeOpenPanels}><div className="img"><span className="cc-icons_chain" /></div>Home</NavLink></li>
          <li style={{display: "none"}}><NavLink key="the-arcade" activeClassName="is-active" exact to="/the-arcade" onClick={closeOpenPanels}><div className="img"><span className="cc-icons_arcade" /></div>The Arcade</NavLink></li>
          <li><NavLink key="gallery" activeClassName="is-active" exact to="/gallery" onClick={closeOpenPanels}><div className="img"><span className="cc-icons_gallery" /></div>Cat Gallery</NavLink></li>
          <li><NavLink key="banner-builder" activeClassName="is-active" exact to="/banner-builder" onClick={closeOpenPanels}><div className="img"><span className="cc-icons_banner-builder" /></div>Banner Builder</NavLink></li>
          <li><NavLink key="road-map" activeClassName="is-active" exact to="/roadmap" onClick={closeOpenPanels}><div className="img"><span className="cc-D" /></div>Roadmap</NavLink></li>
          <li><NavLink key="story" activeClassName="is-active" exact to="/story" onClick={closeOpenPanels}><div className="img"><span className="cc-B" /></div>Story</NavLink></li>
      </ul>
      <ul>
          <li className="heading">Information</li>
          <li><NavLink key="about-us" activeClassName="is-active" exact to="/about" onClick={closeOpenPanels}>About</NavLink></li>
          <li><NavLink key="faqs" activeClassName="is-active" exact to="/faqs" onClick={closeOpenPanels}>FAQs</NavLink></li>
          <li><NavLink key="team" activeClassName="is-active" exact to="/team" onClick={closeOpenPanels}>The Team</NavLink></li>
          <li><NavLink key="careers" activeClassName="is-active" exact to="/careers" onClick={closeOpenPanels}>Careers</NavLink></li>
          <li><NavLink key="downloads" activeClassName="is-active" exact to="/downloads" onClick={closeOpenPanels}>Downloads</NavLink></li>
      </ul>
      <ul style={{display: "none"}}>
          <li className="heading">The Blog</li>
          <li><a href="https://twitter.com/coolcatsnft" target="_blank">NFT Roundup</a></li>
          <li><a href="https://twitter.com/coolcatsnft" target="_blank">Cryptocurrency</a></li>
          <li><a href="https://twitter.com/coolcatsnft" target="_blank">Dev Blogs</a></li>
          <li><a href="https://twitter.com/coolcatsnft" target="_blank">Art Blogs</a></li>
      </ul>
      <ul>
          <li className="heading">Connect</li>
          <li><a href="https://twitter.com/coolcatsnft" target="_blank"><div className="img"><span className="cc-icons_twitter" /></div>Twitter</a></li>
          <li><a href="https://discord.gg/coolcatsnft" target="_blank"><div className="img"><span className="cc-icons_discord" /></div>Discord</a></li>
          <li><a href="https://opensea.io/collection/cool-cats-nft" target="_blank"><div className="img"><span className="cc-icons_opensea" /></div>OpenSea</a></li>
          <li><a href="https://www.youtube.com/channel/UCg2TFGt5LqBOSkEfeoP_shQ" target="_blank"><div className="img"><span className="cc-icons_youtube" /></div>YouTube</a></li>
          <li><a href="https://store.coolcatsnft.com/" target="_blank"><div className="img"><span className="cc-icons_shop" /></div>Merch</a></li>
      </ul>
      <ul>
          <li className="heading">Learn</li>
          <li><a href="https://cooltopia.coolcatsnft.com/" target="_blank"><div className="img">k</div>Cooltopia</a></li>
          <li style={{display: "none"}}><a href="https://www.google.com/" target="_blank"><div className="img">u</div>Paper Cats (User)</a></li>
          <li style={{display: "none"}}><a href="https://www.google.com/" target="_blank"><div className="img">d</div>Paper Cats (Dev)</a></li>
          <li><a href="https://coolcatsnft.medium.com/" target="_blank"><div className="img"><span className="cc-icons_medium" /></div>Medium</a></li>
      </ul>
    </Container>
  );
}
