import * as React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

// CSS
import './static/css/style.scss';

// Site layout components
import Footer from './components/Footer';
import StatusMessage from "./components/StatusMessage";
import Container from "./components/Container";

// Pages
import HomePage from './components/Pages/Home/HomePage';
import GalleryPage from './components/Pages/Gallery/Gallery';
import DashboardBar from './components/LoggedIn/DashboardBar';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./context/UserContext";
import BannerBuilder from "./components/Pages/BannerBuilder/BannerBuilder";
import Arcade from "./components/Pages/Arcade/Arcade";
import AboutUs from "./components/Pages/AboutUs/AboutUs";
import ContentPage from "./components/Pages/Content/ContentPage";
import House from "./components/Pages/House/House";
import CoolCat from "./components/Pages/CoolCat/CoolCat";
import WinterWonderland from "./components/Pages/WinterWonderland/WinterWonderland";
import TheTeam from "./components/Pages/TheTeam/TheTeam";
import Vacancies from "./components/Pages/Vacancies/Vacancies";
import Story from "./components/Pages/Story/Story";
import Downloads from "./components/Pages/Downloads/Downloads";

function App() {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const [wrapperClass, setWrapperClass] = useState('home-page');

    const closeOpenPanels = (event: any) => {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        userContext.setMenuOpen(false);
        userContext.setCoolTabletOpen(false);
        userContext.setNewsOpen(false);
    }

    useEffect(() => {
        // @ts-ignore
        document.body.classList.remove(...document.body.classList);

        if (location.pathname.length > 1) {
            const wrapperClass = location.pathname.split("/");

            if (wrapperClass.length > 0) {
                setWrapperClass(wrapperClass[1]);
                document.body.classList.add(wrapperClass[1]);
            } else {
                setWrapperClass(location.pathname);
                document.body.classList.add(location.pathname);
            }
        } else {
            setWrapperClass('home-page');
            document.body.classList.add('home-page');
        }
    }, [location.pathname]);

    return (
        <Container className='wrapper' states={[{ className: wrapperClass }, { className: 'tablet-open', condition: userContext.coolTabletOpen || userContext.menuOpen || userContext.newsOpen }]}>
            {userContext.coolTabletOpen || userContext.menuOpen || userContext.newsOpen ?
                <div onClick={closeOpenPanels} className="overlay">
                    <div className={`news-modal ${userContext.newsOpen ? "show" : "hide"}`}>
                        <div className="news-modal-inner">
                            <button className="close-news" onClick={() => userContext.setNewsOpen(false)}>X</button>
                            <h1>Cool Cats News</h1>
                            <div className="news-block">
                                <p>You really are nosey aren't you! Well I guess you found this secret message. Good for you!</p>
                                <p>In the future, this will be a place for all current major news items for Cool Cats. Make sure to check back soon!</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            <DashboardBar />
            <Switch>
                <Route path="/the-arcade">
                    <Arcade />
                </Route>
                <Route path="/story">
                    <Story />
                </Route>
                <Route path="/gallery">
                    <GalleryPage />
                </Route>
                <Route path="/banner-builder">
                    <BannerBuilder />
                </Route>
                <Route path="/about">
                    <AboutUs />
                </Route>
                <Route path="/team">
                    <TheTeam />
                </Route>
                <Route path="/careers">
                    <Vacancies />
                </Route>
                <Route path="/house">
                    <House />
                </Route>
                <Route path="/winter-wonderland">
                    <WinterWonderland />
                </Route>
                <Route path="/downloads">
                    <Downloads />
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/cool-cat/:token_id" component={ CoolCat } />
                <Route path="/*" component={ ContentPage } />
            </Switch>
            <Footer />
            <StatusMessage />
        </Container>
    );
}

export default App;
