import {GameObjects} from "phaser";
import MainScene from "../scenes/MainScene";
import * as React from "react";

export default class Building extends GameObjects.Sprite {
    private normalTexture: string;
    private hoverTexture: string;
    private link: string;
    public tween: any;
    public mainScene: MainScene;
    public clicked: boolean;
    public postFxPlugin: any;
    public initialy: number;
    public buildingIndex: number;

    constructor(scene: MainScene, x: number, y: number, texture: string, hoverTexture: string, link: string, buildingIndex: number) {
        super(scene, x, -3000, texture);

        this.buildingIndex = buildingIndex;
        this.initialy = y;
        this.mainScene = scene;
        this.normalTexture = texture;
        this.hoverTexture = hoverTexture;
        this.link = link;
        this.clicked = false;
        this.postFxPlugin = this.mainScene.plugins.get('rexglowfilter2pipelineplugin');
        this.showBuildingTween();

        this.on('pointerover',() => {
            this.setTexture(hoverTexture);
            const pipeline = this.postFxPlugin.add(this, {
                distance: 40,
                outerStrength: 2,
                innerStrength: 0,
                glowColor: 0xFF8D00,
            });
        });

        this.on('pointerout',() => {
            this.postFxPlugin.remove(this);

            if (!this.clicked) {
                this.setTexture(texture);
            }
        });

        // const CSSString = 'url(/assets/games/cursors/hand.cur), pointer';

        this.setInteractive({
            pixelPerfect: true,
            alphaTolerance: 1,
            useHandCursor: true
        });

        switch(this.normalTexture) {
            case "news-hover":
                // fall-through
            case "news":
                this.on('pointerup', () => {
                    this.mainScene.showNews();
                });
                break;
            case "house":
                this.on('pointerup', () => {
                    this.mainScene.showTablet();
                });
                break;
            case "ship":
                this.on('pointerup', () => {
                    this.shipTween(this.link);
                });
                break;
            default:
                if (this.link.includes("http")) {
                    this.on('pointerup', () => {
                        this.mainScene.openExternalLink(link);
                    })
                } else {
                    this.on('pointerup', () => {
                        this.mainScene.openInternalLink(link);
                    });
                }
                break;
        }

        this.setOrigin(0, 0);
        this.mainScene.add.existing(this);
    }

    public shipTween(link: string) {
        this.clicked = true;
        this.setTexture(this.hoverTexture);

        this.tween = this.scene.tweens.add({
            targets: this,
            alpha: 1,
            x: '-=320',
            y: '+=320',
            ease: 'Linear',
            duration: 4000,
            repeat: 0,
            onComplete: () => {
                this.mainScene.openExternalLink(link);
            }
        });
    }

    public showBuildingTween() {
        this.tween = this.scene.tweens.add({
            targets: this,
            alpha: 1,
            y: this.initialy,
            ease: BounceInAndOut,
            duration: 3000,
            delay: 100 * this.buildingIndex,
            repeat: 0
        });
    }
}

// Bouncing Function
function BounceInAndOut (v: any) {
    var reverse = false;

    if (v < 0.5) {
        v = 1 - (v * 2);
        reverse = true;
    } else {
        v = (v * 2) - 1;
    }

    if (v < 1 / 2.75) {
        v = 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
        v = 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
    } else if (v < 2.5 / 2.75) {
        v = 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
    } else {
        v = 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
    }

    if (reverse) {
        return (1 - v) * 0.5;
    } else {
        return v * 0.5 + 0.5;
    }
}
