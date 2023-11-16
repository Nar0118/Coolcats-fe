import {GameObjects, Scene} from "phaser";
import MainScene from "../scenes/MainScene";
import { useHistory } from "react-router-dom";
import * as React from "react";

export default class Building extends GameObjects.Sprite {
    private normalTexture: string;
    private hoverTexture: string;
    private link: string;
    public tween: any;
    public mainScene: MainScene;
    public clicked: boolean;

    constructor(scene: MainScene, x: number, y: number, texture: string, hoverTexture: string, link: string) {
        super(scene, x, y, texture);

        this.mainScene = scene;
        this.normalTexture = texture;
        this.hoverTexture = hoverTexture;
        this.link = link;
        this.clicked = false;

        this.on('pointerover',() => {
            this.setTexture(hoverTexture);
        });

        this.on('pointerout',() => {
            if (!this.clicked) {
                this.setTexture(texture);
            }
        });

        const CSSString = 'url(/assets/games/cursors/hand.cur), pointer';

        this.setInteractive({
            pixelPerfect: true,
            alphaTolerance: 1,
            cursor: CSSString
        });

        if (this.link) {
            if(this.normalTexture === "ship") {
                this.on('pointerup', () => {
                    this.shipTween(this.link);
                });
            } else {
                if (this.link.includes("http")) {
                    this.on('pointerup', () => {
                        this.mainScene.openExternalLink(link);
                    })
                } else {
                    this.on('pointerup', () => {
                        this.mainScene.openInternalLink(link);
                    });
                }
            }
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
}
