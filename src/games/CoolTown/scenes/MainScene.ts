import { GameObjects, Scene } from "phaser";
import Building from "../objects/Building";
import PhaserGame from "../../GameClass";
import Assets from '../assets/AssetImport';

export default class MainScene extends Scene {
    public currentGame: PhaserGame | undefined;

    // TODO: Remove Soon
    private boatSpine!: SpineGameObject;
    private animationNames: string[] = [];
    private animationIndex = 1;

    buildings: any = [
        {x: 1042, y: 248, texture: 'town-hall', hoverTexture: 'town-hall-hover', link: 'https://discord.gg/coolcatsnft'},
        {x: 1005, y: 417, texture: 'news', hoverTexture: 'news-hover', link: ''},
        {x: 390, y: 522, texture: 'merch', hoverTexture: 'merch-hover', link: 'https://store.coolcatsnft.com'},
        {x: 1002, y: 984, texture: 'ship', hoverTexture: 'ship-hover', link: 'https://opensea.io/collection/cool-cats-nft'},
        {x: 1156, y: 604, texture: 'egg-field', hoverTexture: 'egg-field-hover', link: ''},
        {x: 704, y: 264, texture: 'museum', hoverTexture: 'museum-hover', link: '/gallery'},
        {x: 652, y: 410, texture: 'house', hoverTexture: 'house-hover', link: ''},
        {x: 538, y: 538, texture: 'shop', hoverTexture: 'shop-hover', link: '/banner-builder'},
        {x: 564, y: 304, texture: 'milk-shop', hoverTexture: 'milk-shop-hover', link: ''},
    ];

    preload () {
        this.load.plugin('rexglowfilter2pipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js', true);
        const assets = new Assets().fetchAssets();

        assets.forEach((asset: any) => {
            this.load.image(asset.key, asset.image);
        });

        // TODO: Remove Soon
        this.currentGame = this.game as PhaserGame;

        this.triggerPreloadBar();
    }

    create() {
        const BaseMap = new GameObjects.Image(this, 0, 0, 'background');
        BaseMap.setOrigin(0, 0);
        this.add.existing(BaseMap);

        if (this.buildings.length > 1) {
            for (let i = 0; i < this.buildings.length; i++) {
                new Building(
                    this,
                    this.buildings[i].x,
                    this.buildings[i].y,
                    this.buildings[i].texture,
                    this.buildings[i].hoverTexture,
                    this.buildings[i].link,
                    i
                );
            }
        }
    }

    public openInternalLink(url: string) {
        if (this.currentGame) {
            this.currentGame.react.props.history.push({
                pathname: url
            });
        }
    }

    public openExternalLink (url: string) {
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
    }

    public showNews() {
        if(this.currentGame) {
            this.currentGame.react.context.setNewsOpen(true);
        }
    }

    public showTablet() {
        if(this.currentGame) {
            this.currentGame.react.context.setCoolTabletOpen(true);
        }
    }

    public triggerPreloadBar() {
        // Inner progress bar
        const progressBar = this.add.graphics();
        progressBar.setDepth(10);

        // Outer progress box
        const progressBox = this.add.graphics();
        progressBox.setDepth(8);
        progressBox.fillStyle(0x14396D, 0.8);
        progressBox.fillRoundedRect(816, 570, 320, 50, 10);

        // Loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading...',
            style: {
                font: '30px Poppins',
                fontStyle: 'strong',
                color: '#000000'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value: any) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRoundedRect(826, 580, 300 * value, 30, 5);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();

            if(this.currentGame) {
                this.currentGame.react.context.setGameLoaded(true);
            }
        });
    }
}
