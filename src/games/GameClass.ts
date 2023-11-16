// phaserGame.js
import * as Phaser from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

class PhaserGame extends Phaser.Game {
    public react: any;

    constructor(react: any, config: any) {
        super(config)

        this.react = react;
    }
}

export default PhaserGame;
