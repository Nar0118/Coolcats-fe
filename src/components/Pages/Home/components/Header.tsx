import * as React from 'react';
import Game from "../../../../games/CoolTown/Game";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";

export default function HeaderNav() {
    const history = useHistory();
    const { gameLoaded } = useContext(UserContext);

    return (
        <section className={`header ${gameLoaded ? "game-loaded" : ""}`}>
            <div className="cloud" />
            <div className="cloud cloud2" />
            <div className="cloud cloud3" />
            <div className="cloud cloud4" />
            <div className="cloud cloud5" />
            <div className="cloud cloud6" />
            <Game history={history} />
        </section>
    );
}
