import * as React from "react";
import PhaserGame from "../GameClass";
import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import {UserContext} from "../../context/UserContext";

type MyProps = {
    history: any;
};

type MyState = {};

class Game extends React.Component<MyProps, MyState> {
    public game: any;
    public gameConfig: any;
    public overlayShown = false;

    componentDidMount() {
        /**
         * Disable the propagation of mouse/touch events
         * @param {any} event The x position of the wheel light
         */
        const disablePropagation = (event: any) => {
            if (this.overlayShown) {
                event.stopImmediatePropagation();
            }
        }

        /**
         * Mouse event listeners
         */
        window.addEventListener('mouseup', disablePropagation);
        window.addEventListener('mousedown', disablePropagation);
        window.addEventListener('touchstart', disablePropagation);
        window.addEventListener('touchend', disablePropagation);

        this.gameConfig = {
            type: Phaser.AUTO,
            width: 1972,
            height: 1303,
            parent: "phaser-game",
            scene: [MainScene],
            transparent: true,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        }

        this.game = new PhaserGame(this, this.gameConfig);

        this.game.input.events.on('gameout', () => {
            this.game.scene.pause('MainScene');
        });

        this.game.input.events.on('gamein', () => {
            this.game.scene.resume('MainScene');
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidUpdate() {
        if (
            this.context.coolTabletOpen ||
            this.context.menuOpen ||
            this.context.newsOpen
        ) {
            this.overlayShown = true;
        } else {
            this.overlayShown = false;
        }
    }

    componentWillUnmount() {
        this.game.destroy();
    }

    public render() {
        return <div id="phaser-game" />;
    }
}

Game.contextType = UserContext;

export default Game;
