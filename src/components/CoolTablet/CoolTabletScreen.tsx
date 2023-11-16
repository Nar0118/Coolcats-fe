import { useContext, useState } from "react";
import { NavigationContext } from "../../context/Navigation";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/Auth";
import Cats from "./Screens/Cats/Cats";
import Icon from "./Screens/MenuIcons/Icon";
import LogoutIcon from "../../static/images/icons/sign-out-alt-solid.svg";
import Container from '../Container';
import CatBlock from "./Screens/Cats/CatBlock";
import CatFilter from "./CatFilter";

function CoolTabletScreen() {
  const {
    setCoolTabletScreen,
    coolTabletScreen
  } = useContext(NavigationContext);

  const { setCoolTabletOpen } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const setNewScreen = (screen: string) => {
    setCoolTabletScreen(screen);
  }

  const logoutOfSite = () => {
    setCoolTabletOpen(false);
    logout();
  }

  return (
    <Container classNames={ ['cool-tablet-screen', coolTabletScreen]}>
        <nav className="cool-tablet__top_nav">
          <ul>
            <li key="cats">
              <a key="cats-link" className={`cats-link button light-blue ${coolTabletScreen === 'cats' ? "active" : ""}`} onClick={() => setNewScreen('cats')}>
                <Icon icon="cats" />
                <span>Cats</span>
              </a>
            </li>
            <li className="spacer" key="spacer">&nbsp;</li>
            <li key="logout">
              <button
                  className="disconnect-button profile-button button"
                  type="button"
                  onClick={logoutOfSite}
              >
                <img src={LogoutIcon} />
              </button>
            </li>
          </ul>
        </nav>
        <div className="views-container">
          <div className="items-view">
            <div className="selected-view">
              {coolTabletScreen === 'cats' && <CatFilter />}
              <div className="view-contents">
                {coolTabletScreen === 'cats' && <Cats />}
              </div>
            </div>
          </div>
          { ['cats'].indexOf(coolTabletScreen) >= 0 && <div className="detailed-view">
              { coolTabletScreen === 'cats' && <CatBlock /> }
          </div> }
        </div>
    </Container>
  );
}

export default CoolTabletScreen;
