// @ts-nocheck
import {fabric} from "fabric";
import {Canvas, Group, Object, Transform} from "fabric/fabric-impl";
import { StateManager } from "./components/scripts/state/StateManager";
import {backgrounds, images} from "./components/scripts/constants/assets";
import React from "react";
import {addItem, loadAndCleanImage, loadImage} from "./components/scripts/bannerBuilder/utils";
import { NftListType } from '../../../types/interfaces';

declare var $: any;

// Transform Controls
import AngleControl from "./components/controls/transforming/angle";
import LeftControl from "./components/controls/transforming/left";
import TopControl from "./components/controls/transforming/top";
import ScaleControl from "./components/controls/transforming/scale";
import SkewXControl from "./components/controls/transforming/skew-x";
import SkewYControl from "./components/controls/transforming/skew-y";
import FlipControls from "./components/controls/transforming/flip-controls";

// Grid Controls
import GridAlignmentControl from "./components/controls/grid/grid-alignment";
import ShowGridControl from "./components/controls/grid/show-grid";
import GridDensityControl from "./components/controls/grid/grid-density";
import BringToFront from "./components/controls/order/bring-to-front";
import SendToBack from "./components/controls/order/send-to-back";
import BringForwards from "./components/controls/order/bring-forwards";
import SendBackwards from "./components/controls/order/send-backwards";
import RotationSnappingOption from "./components/controls/options/rotation-snapping";
import ImageEdgeSnappingOption from "./components/controls/options/image-edge-snapping";
import GroupControl from "./components/controls/grouping/group";
import UngroupControl from "./components/controls/grouping/ungroup";
import SelectAllControl from "./components/controls/selection/select-all";
import DeselectControl from "./components/controls/selection/deselect";
import ChangeBackgroundColorControl from "./components/controls/background/change-background-color";
import DownloadControl from "./components/controls/actions/download";
import DeleteControl from "./components/controls/actions/delete";
import UndoControl from "./components/controls/undo-redo/undo";
import RedoControl from "./components/controls/undo-redo/redo";
import CleanImage from "./components/CleanImage";
import { UserContext } from "../../../context/UserContext";

interface OnLoadAble {
    onload: any;
}

export default class BannerBuilder extends React.Component<any, any> {
    static contextType = UserContext;

    canvas: any;

    private deleteIcon = "";
    private deleteImg: any;
    private cloneIcon = "";
    private cloneImg: any;

    private cornerSize = 24;

    private stateManager: StateManager | undefined;

    private angleSnap: boolean | undefined;
    private gridSnap: string | undefined;
    private gridDensity: number | undefined;
    private gridGroup: Group | null | undefined;
    isGridVisible: boolean | undefined;

    private snapCanvasEdgePixels: number | undefined;
    private snapImages: boolean | undefined;
    private snapImageEdgePixels: number | undefined;
    private snapImageCornerPixels: number | undefined;

    private canvasHeight: number | undefined;
    private canvasWidth: number | undefined;

    private static instance: BannerBuilder;

    public static getInstance(): BannerBuilder {
        if (!BannerBuilder.instance) {
            BannerBuilder.instance = new BannerBuilder({});
        }

        return BannerBuilder.instance;
    }

    constructor(props: any) {
        super(props);
        this.state = {tabId: 1};
        BannerBuilder.instance = this;

        this.imageOnClick = this.imageOnClick.bind(this);
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas("artBoard", {
            preserveObjectStacking: true
        });

        this.init();
        this.populateButtons();
        this.itemControls();
        this.setupInputFilters();
        // this.renderWaterMark();
    }

    async renderWaterMark(): Promise<void> {
        const patternCanvas = document.createElement("canvas"),
            patternContext = patternCanvas.getContext("2d");

        const img: any = await loadImage('./assets/watermark/watermark.png');
        if (!patternContext) return;

        this.canvas.on("after:render", (e: any) => {
            const {ctx} = e;

            if (ctx) {
                const width = img.width * 0.75;
                const height = img.height * 0.75;
                patternCanvas.width = width;
                patternCanvas.height = height;
                patternContext.drawImage(img, 0, 0, width, height)

                const pattern = ctx.createPattern(patternCanvas, "repeat");
                ctx.save();
                ctx.transform.apply(ctx, Array.from(this.canvas.viewportTransform));
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.restore();
            }
        });
    }

    init(): void {
        // $(document).on("click", (e) => {
        //     // @ts-ignore
        //     if (!$(e.target).closest("#artBoard").length && !(e.target instanceof fabric.Object)) {
        //         if (this.canvas.getActiveObject()) {
        //             this.canvas.discardActiveObject();
        //             this.canvas.requestRenderAll();
        //         }
        //     }
        // })
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = "blue";
        fabric.Object.prototype.cornerStyle = "circle";
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 20,
            cursorStyle: "pointer",
            mouseUpHandler: (_eventData: MouseEvent, transform: Transform, x: number, y: number) => {
                return this.deleteItem(transform);
            },
            render: (ctx: any, left: number, top: number, styleOverride: any, fabricObject: any) => {
                this.renderIcon(ctx, left, top, styleOverride, fabricObject, this.deleteImg);
            }
        });
        fabric.Object.prototype.controls.cloneControl = new fabric.Control({
            x: -0.5,
            y: -0.5,
            offsetY: 20,
            cursorStyle: "pointer",
            mouseUpHandler: (_eventData: MouseEvent, transform: Transform, x: number, y: number) => {
                return this.cloneItem(_eventData, transform);
            },
            render: (ctx: any, left: number, top: number, styleOverride: any, fabricObject: any) => {
                this.renderIcon(ctx, left, top, styleOverride, fabricObject, this.cloneImg);
            }
        });
        this.deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
        this.cloneIcon = "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='copy' class='svg-inline--fa fa-copy fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='navy' d='M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z'%3E%3C/path%3E%3C/svg%3E";
        // @ts-ignore
        this.canvasWidth = this.canvas.width; // $("#artBoard").outerWidth();
        // @ts-ignore
        this.canvasHeight = this.canvasWidth / 3;

        const delImg = document.createElement("img");
        delImg.src = this.deleteIcon;
        delImg.classList.add("add");
        this.deleteImg = delImg;

        const cImg = document.createElement("img");
        cImg.src = this.cloneIcon;
        cImg.classList.add("add");
        this.cloneImg = cImg;


        this.setupBackgroundColourPalette();

        this.stateManager = new StateManager(this.canvas, this);

        $("input[type=checkbox]").prop("checked", false);

        this.angleSnap = false;
        this.setupAngleSnapping();

        this.snapImages = false;
        this.snapCanvasEdgePixels = 5;
        this.snapImageEdgePixels = 15;
        this.snapImageCornerPixels = 7;

        this.setupBackwardsForwardsButtons();

        this.gridSnap = "none";
        this.gridDensity = 50;
        this.setupGridSnapping();
        this.setCanvasDragBoundaries();
        this.setupGridDensityFiltering();

        this.setupDarkModeButton();

        this.setupClearCanvasButton();
        this.setupDownloadButton();

        this.setupFlipping();
        this.setupGrouping();

        this.setupDeleteKey();

        // Dark mode by default to save my eyes
        // $("#hidden-dark").prop("checked", true);
        // $("body").addClass("dark-mode-body");
        // $("span .darken").addClass("dark-mode-font");
        // $("label").addClass("dark-mode-font");
    }

    setupDownloadButton() {
        $("#download").on("click", () => {
            this.downloadCanvasAsPng();
        });
    }

    setupBackwardsForwardsButtons() {
        $("#send-backwards").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            // if (this.canvas.getActiveObject().type !== "activeSelection") {
            //   return;
            // }
            this.canvas.getActiveObject().sendBackwards();
            // @ts-ignore
            // @ts-ignore
            if (this.isGridVisible) {
                // @ts-ignore
                this.gridGroup.sendToBack();
            }
            this.canvas.requestRenderAll();
        });
        $("#bring-forwards").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            // if (this.canvas.getActiveObject().type !== "activeSelection") {
            //   return;
            // }
            this.canvas.getActiveObject().bringForward();
            this.canvas.requestRenderAll();
        });
        $("#send-to-back").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            // if (this.canvas.getActiveObject().type !== "activeSelection") {
            //   return;
            // }
            this.canvas.getActiveObject().sendToBack();
            // @ts-ignore
            if (this.isGridVisible) {
                // @ts-ignore
                this.gridGroup.sendToBack();
            }
            this.canvas.requestRenderAll();
        });
        $("#bring-to-front").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            // if (this.canvas.getActiveObject().type !== "activeSelection") {
            //   return;
            // }
            this.canvas.getActiveObject().bringToFront();
            this.canvas.requestRenderAll();
        });
    }


    setupBackgroundColourPalette() {
        this.canvas.setBackgroundColor("#FFF", this.canvas.renderAll.bind(this.canvas));

        $("#containerClassName").spectrum({
            containerClassName: "bg-picker"
        });
        $("#colour-picker").spectrum({
            // @ts-ignore
            type: "color",
            color: "white",
            showPaletteOnly: true,
            showAlpha: false,
            palette: [
                ["#DEC5A8", "#9CB5FE", "#39E27D", "#FC9144"],
                ["#FD9DCB", "#FA3C6A", "#A070DD", "#FAD121"],
                ["#FFF"]
            ],
            move: (color) => {
                this.setBackground(color.toHexString());
            }
        });
        $(".sp-preview").on("click", () => {
            $("#colour-picker").spectrum("toggle");
            return false;
        });
        $(".sp-dd").on("click", () => {
            $("#colour-picker").spectrum("toggle");
            return false;
        });
    }

    setBackground(colour: string) {
        this.canvas.backgroundImage = 0;
        this.canvas.setBackgroundColor(colour, () => {
            this.canvas.renderAll.bind(this.canvas);
            this.saveState();
        });
    }

    removeBackgroundImage() {
        this.canvas.backgroundImage = 0;
        this.canvas.setBackgroundColor("#FFF", this.canvas.renderAll.bind(this.canvas));
    }

    setCanvasDragBoundaries() {
        // @ts-ignore
        this.canvas.on("object:moving", (options) => {
            if (!options.target) {
                return;
            }

            let obj = options.target;
            obj.setCoords();

            let left = obj.left;
            let top = obj.top;

            let bound = obj.getBoundingRect();
            let dl =  (bound.left - left);
            let dt = (bound.top - top);

            if (left + (this.canvasWidth * 0.1) + dl < this.snapCanvasEdgePixels) {
                obj.set("left", -(this.canvasWidth * 0.1) - dl);
            }
            if (top + (this.canvasHeight * 0.1) + dt < this.snapCanvasEdgePixels) {
                obj.set("top", -(this.canvasHeight * 0.1) - dt);
            }
            if ((left + (obj.width * obj.scaleX) - (this.canvasWidth * 0.1) + dl) > (this.canvasWidth - this.snapCanvasEdgePixels)) {
                obj.set("left", (this.canvasWidth - (obj.width * obj.scaleX) - dl + (this.canvasWidth * 0.1)));
            }
            if ((top + (obj.height * obj.scaleY) - (this.canvasHeight * 0.1) + dt) > (this.canvasHeight - this.snapCanvasEdgePixels)) {
                obj.set("top", (this.canvasHeight - (obj.height * obj.scaleY) - dt + (this.canvasHeight * 0.1)));
            }
        });
    }

    setupGridSnapping(): void {
        $("#grid-snapping").val("none").trigger("chosen:updated");
        $("#grid-snapping").on("change", () => {
            this.gridSnap = $("#grid-snapping").val() as string;
        });
        $("#edge-snapping").on("change", (e) => {
            const checkbox = e.target as HTMLInputElement;
            this.snapImages = checkbox.checked;
        });
        this.canvas.on("object:moving", (e) => {
            let BannerBuilder = this;
            switch (BannerBuilder.gridSnap) {
                case "none":
                    if (this.snapImages) {
                        if (!e.target) {
                            return;
                        }
                        let obj = e.target;
                        obj.setCoords();
                        this.canvas.forEachObject((targ) => {
                            if (targ === obj) {
                                return;
                            }

                            // EDGE SNAPPING
                            // Check for overlap

                            if (obj.intersectsWithObject(targ)) {
                                return;
                            }

                            // Right side or left?
                            if ((obj.top > targ.top && obj.top < targ.top + (targ.height * targ.scaleY)) || (targ.top > obj.top && targ.top < obj.top + (obj.height * obj.scaleY))) {
                                // RIGHT
                                if (obj.aCoords.tl.x > targ.aCoords.br.x && obj.aCoords.tl.x - targ.aCoords.br.x < this.snapImageEdgePixels) {
                                    obj.set({left: targ.aCoords.br.x});

                                    // Corner detection
                                    obj.setCoords();
                                    if (Math.abs(targ.aCoords.tr.y - obj.aCoords.tl.y) < this.snapImageCornerPixels) {
                                        obj.set({
                                            top: targ.top
                                        });
                                    } else if (Math.abs(targ.aCoords.br.y - obj.aCoords.bl.y) < this.snapImageCornerPixels) {
                                        obj.set({
                                            top: targ.top + (targ.height * targ.scaleY) - (obj.height * obj.scaleY)
                                        });
                                    }
                                }

                                // LEFT
                                if (targ.aCoords.tl.x > obj.aCoords.br.x && targ.aCoords.tl.x - obj.aCoords.br.x < this.snapImageEdgePixels) {
                                    obj.set({
                                        left: targ.aCoords.tl.x - (obj.width * obj.scaleX)
                                    });

                                    // Corner detection
                                    obj.setCoords();
                                    if (Math.abs(targ.aCoords.tl.y - obj.aCoords.tr.y) < this.snapImageCornerPixels) {
                                        obj.set({
                                            top: targ.top
                                        });
                                    } else if (Math.abs(targ.aCoords.bl.y - obj.aCoords.br.y) < this.snapImageCornerPixels) {
                                        obj.set({
                                            top: targ.top + (targ.height * targ.scaleY) - (obj.height * obj.scaleY)
                                        });
                                    }
                                }
                            }

                            // top or bottom
                            if ((obj.left > targ.left && obj.left < targ.left + (targ.width * targ.scaleX)) || (targ.left > obj.left && targ.left < obj.left + (obj.width * obj.scaleX))) {

                                // top
                                if (targ.aCoords.tl.y > obj.aCoords.br.y && targ.aCoords.tl.y - obj.aCoords.br.y < this.snapImageEdgePixels) {
                                    obj.set({top: targ.aCoords.tl.y - (obj.height * obj.scaleY)});

                                    obj.setCoords();
                                    if (Math.abs(targ.aCoords.tl.x - obj.aCoords.bl.x) < this.snapImageCornerPixels) {
                                        obj.set({
                                            left: targ.left
                                        });
                                    } else if (Math.abs(targ.aCoords.tr.x - obj.aCoords.br.x) < this.snapImageCornerPixels) {
                                        obj.set({
                                            left: targ.left + (targ.width * targ.scaleX) - (obj.width * obj.scaleX)
                                        });
                                    }
                                }

                                // bottom
                                if (obj.aCoords.tl.y > targ.aCoords.br.y && obj.aCoords.tl.y - targ.aCoords.br.y < this.snapImageEdgePixels) {
                                    obj.set({top: targ.aCoords.br.y});

                                    obj.setCoords();
                                    if (Math.abs(targ.aCoords.bl.x - obj.aCoords.tl.x) < this.snapImageCornerPixels) {
                                        obj.set({
                                            left: targ.left
                                        });
                                    } else if (Math.abs(targ.aCoords.br.x - obj.aCoords.tr.x) < this.snapImageCornerPixels) {
                                        obj.set({
                                            left: targ.left + (targ.width * targ.scaleX) - (obj.width * obj.scaleX)
                                        });
                                    }
                                }
                            }

                            // let targetLeft = options.target.left;
                            // let targetRight = targetLeft + (options.target.width * options.target.scaleX);
                            // let targetTop = options.target.top;
                            // let targetBottom = targetTop + (options.target.height * options.target.scaleY);
                            // let objectLeft = obj.left;
                            // let objectRight = objectLeft + (options.target.width * options.target.scaleX);
                            // let objectTop = obj.top;
                            // let objectBottom = objectTop + (options.target.height * options.target.scaleY);


                        });
                    }
                    return;
                case "soft":
                    if (Math.round(e.target.left / BannerBuilder.gridDensity * 4) % 4 === 0 && (Math.round((e.target.top + ((e.target.height * e.target.scaleY) % BannerBuilder.gridDensity)) / BannerBuilder.gridDensity * 4)) % 4 === 0) {
                        let offset = (((e.target.height * e.target.scaleY) % BannerBuilder.gridDensity))
                        if (offset > BannerBuilder.gridDensity / 2) {
                            offset = offset - BannerBuilder.gridDensity;
                        }
                        e.target.set({
                            left: Math.round(e.target.left / BannerBuilder.gridDensity) * BannerBuilder.gridDensity,
                            top: Math.round(e.target.top / BannerBuilder.gridDensity) * BannerBuilder.gridDensity - offset
                        }).setCoords();
                        break;
                    }
                    break;
                case "hard":
                    let offset = (((e.target.height * e.target.scaleY) % BannerBuilder.gridDensity))
                    if (offset > BannerBuilder.gridDensity / 2) {
                        offset = offset - BannerBuilder.gridDensity;
                    }
                    e.target.set({
                        left: Math.round((e.target.left) / BannerBuilder.gridDensity) * BannerBuilder.gridDensity,
                        top: (Math.round(((e.target.top) / BannerBuilder.gridDensity)) * BannerBuilder.gridDensity) - offset
                    });
                    break;
            }
        });
        $("#show-grid").on("change", (e) => {
            const checkbox = e.target as HTMLInputElement;

            if (checkbox.checked) {
                if (!$("#grid-density").val()) {
                    this.gridDensity = 50;
                } else {
                    this.gridDensity = $("#grid-density").val() as number;
                }
                this.showGrid();
            } else {
                this.hideGrid();
            }
        });
        $("#grid-input").on("change", (e) => {
            if (this.isGridVisible) {
                if (!$("#grid-input").val()) {
                    this.gridDensity = 50;
                } else if (parseInt($("#grid-input").val() as string) < 5) {
                    this.gridDensity = 5;
                } else {
                    this.gridDensity = $("#grid-input").val() as number;
                }

                if ($("#grid-range")) {
                    $("#grid-range").val(this.gridDensity);
                }
                this.hideGrid();
                this.showGrid();
            }
        });
        $("#grid-range").on("input", (e) => {
            if (this.isGridVisible) {
                if (!$("#grid-range").val() || parseInt($("#grid-range").val() as string) === 0) {
                    this.gridDensity = 50;
                } else {
                    this.gridDensity = $("#grid-range").val() as number;
                }

                if ($("#grid-input")) {
                    $("#grid-input").val(this.gridDensity);
                }
                this.hideGrid();
                this.showGrid();
            }
        });
    }

    setupClearCanvasButton() {
        $("#clear").on("click", () => {
            this.saveState();
            this.canvas.clear();
            if (this.isGridVisible) {
                this.showGrid();
            }
            this.canvas.setBackgroundColor("#FFF");
        });
    }

    setupGridDensityFiltering() {
        // ts-ignore
        this.setInputFilters(document.getElementById("grid-input") as HTMLInputElement, (value) => {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100 || parseInt(value) >= 5);
        });
    }

    setupInputFilters() {
        this.setInputFilters(document.getElementById("angle-control") as HTMLInputElement, (value) => {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 360);
        });
        this.setInputFilters(document.getElementById("left-control") as HTMLInputElement, (value) => {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1200);
        });
        this.setInputFilters(document.getElementById("top-control") as HTMLInputElement, (value) => {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 400);
        });
        this.setInputFilters(document.getElementById("scale-control") as HTMLInputElement, (value) => {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100);
        });
        this.setInputFilters(document.getElementById("skewX-control") as HTMLInputElement, (value) => {
            if (value.charAt(0) === "-") {
                value = value.substr(1);
            }
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 45);
        });
        this.setInputFilters(document.getElementById("skewY-control") as HTMLInputElement, (value) => {
            if (value.charAt(0) === "-") {
                value = value.substr(1);
            }
            return /^\d*$/.test(value.replace()) && (value === "" || parseInt(value) <= 45);
        });
    }

    setInputFilters(textbox: HTMLElement, inputFilter: (value) => boolean): void {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function (this: (HTMLInputElement | HTMLTextAreaElement) & { oldValue: string; oldSelectionStart: number | null, oldSelectionEnd: number | null }) {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty.call(this, "oldValue")) {
                    this.value = this.oldValue;
                    if (this.oldSelectionStart !== null &&
                        this.oldSelectionEnd !== null) {
                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    }
                } else {
                    this.value = "";
                }
            });
        });
    }

    async loadWalletCats(cats: string[]): Promise<void> {
        await loadAndCleanImage(cats, this.canvas);
    }

    showGrid() {
        let gridOptions = {
            stroke: "#808080",
            strokeWidth: 0.5,
            selectable: false,
            opacity: 1,
            evented: false,
            excludeFromExport: true
        };

        let gridLines: fabric.Line[] = [];

        for (let i = 0; i < (this.canvasWidth / this.gridDensity); i++) {
            gridLines.push(new fabric.Line([i * this.gridDensity, 0, i * this.gridDensity, this.canvasHeight], gridOptions));
        }
        for (let i = 0; i < (this.canvasHeight / this.gridDensity); i++) {
            gridLines.push(new fabric.Line([0, i * this.gridDensity, this.canvasWidth, i * this.gridDensity], gridOptions));
        }
        this.gridGroup = new fabric.Group(gridLines, {
            selectable: false,
            evented: false,
            excludeFromExport: true
        });

        //this.gridGroup.addWithUpdate();
        this.canvas.add(this.gridGroup);
        this.gridGroup.sendToBack();
        this.isGridVisible = true;
    }

    hideGrid(): void {
        this.gridGroup && this.canvas.remove(this.gridGroup);
        this.gridGroup = null;
        this.isGridVisible = false;
    }

    setupAngleSnapping(): void {
        $("#angle-snapping").on("change", (e) => {
            const checkbox = e.target as HTMLInputElement;
            this.angleSnap = checkbox.checked;

            if (checkbox.checked) {
                fabric.Object.prototype.set({
                    snapThreshold: 11.25,
                    snapAngle: 22.5
                });
            } else {
                fabric.Object.prototype.set({
                    snapThreshold: 0,
                    snapAngle: 0
                });
            }
        });
    }

    setupFlipping(): void {
        $("#flip-x").on("click", () => {
            let obj = this.canvas.getActiveObject();
            if (!obj) {
                return;
            }
            obj.set("flipX", !obj.flipX);
            this.saveState();
            this.canvas.requestRenderAll();
        });
        $("#flip-y").on("click", () => {
            let obj = this.canvas.getActiveObject();
            if (!obj) {
                return;
            }
            obj.set("flipY", !obj.flipY);
            this.saveState();
            this.canvas.requestRenderAll();
        });
    }

    setupGrouping(): void {
        $("#group").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            if (this.canvas.getActiveObject().type !== "activeSelection") {
                return;
            }
            this.canvas.getActiveObject().toGroup();
            this.canvas.requestRenderAll();
        });
        $("#ungroup").on("click", () => {
            if (!this.canvas.getActiveObject()) {
                return;
            }
            if (this.canvas.getActiveObject().type !== "group") {
                return;
            }
            this.canvas.getActiveObject().toActiveSelection();
            this.canvas.requestRenderAll();
        })
        $("#select-all").on("click", () => {
            this.canvas.discardActiveObject();
            let selection = new fabric.ActiveSelection(this.canvas.getObjects(), {
                canvas: this.canvas,
            });
            this.canvas.setActiveObject(selection);
            this.canvas.requestRenderAll();
        })
        $("#deselect").on("click", () => {
            this.canvas.discardActiveObject();
            this.canvas.requestRenderAll();
        })
    }

    populateButtons(): void {
        for (const name of images) {

            const img = document.createElement("img");
            img.src = `./assets/images/${name}`;

            img.onclick = (e) => {
                const target = e.target || e.srcElement;
                if (target && target instanceof Element) {
                    const element = target as Element;
                    const src: string = element.getAttribute("src") as string;
                    this.addItem(src);
                }
            };

            // @ts-ignore
            document.getElementById("images").appendChild(img);
        }

        let clearAdded: boolean = false;
        for (const name of backgrounds) {
            const img = document.createElement("img");
            img.src = `./assets/backgrounds/${name}`;

            if (!clearAdded) {
                let clearBackground = document.createElement("button");
                clearBackground.setAttribute("id", "bg-clear");
                clearBackground.innerHTML = "Clear Background";
                // @ts-ignore
                document.getElementById("bgs").before(clearBackground);

                // @ts-ignore
                $("#bg-clear")
                    .css("cursor", "pointer")
                    .on("click", () => {
                        this.removeBackgroundImage();
                    });
                clearAdded = true;
            }

            img.onclick = (e) => {
                const target = e.target || e.srcElement;
                if (target && target instanceof Element) {
                    const element = target as Element;
                    const src: string = element.getAttribute("src") as string;

                    this.canvas.setBackgroundImage(src, this.canvas.renderAll.bind(this.canvas), {
                        scaleX: (this.canvasWidth / img.naturalWidth),
                        scaleY: (this.canvasWidth / img.naturalWidth),
                        // Needed to position backgroundImage at 0/0
                        originX: "left",
                        originY: "top"
                    });
                }
            };

            // @ts-ignore
            document.getElementById("bgs").appendChild(img);
        }
    }

    addItem(src: string): void {
        fabric.Image.fromURL(src, (img) => {
            img.scale(0.2).set({
                left: 100,
                top: 100
            });
            this.canvas.add(img)
                .setActiveObject(img);
        }, {crossOrigin: 'anonymous'});
    }

    deleteItem(transform: Transform): any {
        const target = transform.target;
        const canvas: Canvas | undefined = target.canvas;

        if (canvas) {
            canvas.remove(target);
            canvas.requestRenderAll();

            this.saveState();
        }
    }

    deleteTarget(target: fabric.Object): any {
        const canvas: Canvas | undefined = target.canvas;

        if (canvas) {
            canvas.remove(target);
            canvas.requestRenderAll();

            this.saveState();
        }
    }

    cloneItem(_eventData: MouseEvent, transform: Transform): any {
        const target = transform.target;
        const canvas: Canvas | undefined = target.canvas;

        if (canvas) {
            target.clone((cloned) => {
                cloned.left += 10;
                cloned.top += 10;
                canvas.add(cloned);
            })
        }
    }

    renderIcon(ctx: any, left: number, top: number, styleOverride: any, fabricObject: any, img: any): void {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
    }

    itemControls(): void {
        this.canvas.on({
            "object:added": () => {
                this.updateControls();
            },
            "object:moving": () => {
                this.updateControls();
            },
            "object:scaling": () => {
                this.updateControls();
            },
            "object:resizing": () => {
                this.updateControls();
            },
            "object:rotating": () => {
                this.updateControls();
            },
            "object:skewing": () => {
                this.updateControls();
            },
            "selection:created": (e) => {
                this.updateControls(e.target);
            },
            "selection:updated": (e) => {
                this.updateControls(e.target);
            }
        });

        $(".object-control").on("focusout", () => {
            this.updateControls();
        });
    }

    setupDeleteKey() {
        $(document).on("keyup", (e) => {
            if (e.key === "Delete") {
                if (this.canvas.getActiveObject()) {
                    this.deleteTarget(this.canvas.getActiveObject())
                }
            }
        });
    }

    toggleDarkMode() {
        // document.body.classList.toggle("dark-mode-body");
        $("body").toggleClass("dark-mode-body");
        $("span .darken").toggleClass("dark-mode-font");
        $("label").toggleClass("dark-mode-font");
    }

    setupDarkModeButton() {
        $("#hidden-dark").on("change", () => {
            this.toggleDarkMode();
        });
    }

    updateControls(obje?) {
        let obj: Object;
        if (!obje) {
            obj = this.canvas.getActiveObject();
        } else {
            obj = obje;
        }
        if (!obj) return;

        let $ = (id) => {
            return document.getElementById(id);
        };

        let angleRange: HTMLInputElement | null = $("angle-range") as HTMLInputElement;
        let angleControl: HTMLInputElement | null = $("angle-control") as HTMLInputElement;
        if (angleRange) {
            angleRange.oninput = (e) => {
                const value = angleRange?.value;
                if (!value) return;

                const angle = parseInt(value);
                obj.rotate(angle).setCoords();
                this.canvas.requestRenderAll();

                if (angleControl) {
                    // @ts-ignore
                    angleControl.value = `${obj.angle.toFixed(1)}`;
                }
            };

            if (obj.angle) {
                angleRange.value = `${obj.angle.toFixed(1)}`;
            }
            if (obj.angle === 0 || obj.angle === -0) {
                angleRange.value = `${0}`;
            }
        }
        if (angleControl) {
            angleControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                const value = angleControl?.value;
                if (!value) return;

                const angle = parseInt(value);
                obj.rotate(angle).setCoords();
                this.canvas.requestRenderAll();

                if (angleRange) {
                    // @ts-ignore
                    angleRange.value = `${obj.angle.toFixed(1)}`;
                }
            };

            if (obj.angle) {
                angleControl.value = `${obj.angle.toFixed(1)}`;
            }
            if (obj.angle === 0 || obj.angle === -0) {
                angleControl.value = `${0}`;
            }
        }

        let scaleRange: HTMLInputElement | null = $("scale-range") as HTMLInputElement;
        let scaleControl: HTMLInputElement | null = $("scale-control") as HTMLInputElement;
        if (scaleRange) {
            scaleRange.oninput = (e) => {
                const value = scaleRange?.value;
                if (!value) return;

                const scale = parseFloat(value) / 100;
                obj.scale(scale).setCoords();
                this.canvas.requestRenderAll();

                if (scaleControl) {
                    // @ts-ignore
                    scaleControl.value = `${(obj.scaleX * 100).toFixed(1)}`;
                }
            };

            if (obj.scaleX) {
                scaleRange.value = `${(obj.scaleX * 100).toFixed(1)}`;
            }
        }
        if (scaleControl) {
            scaleControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                const value = scaleControl?.value;
                if (!value) return;

                obj.scale(parseFloat(value) / 100).setCoords();
                this.canvas.requestRenderAll();

                if (scaleRange) {
                    // @ts-ignore
                    scaleRange.value = `${(obj.scaleX * 100).toFixed(1)}`;
                }
            };
            if (obj.scaleX) {
                // @ts-ignore
                scaleControl.value = `${(obj.scaleX * 100).toFixed(1)}`;
            }
        }

        let leftControl: HTMLInputElement | null = $("left-control") as HTMLInputElement;
        if (leftControl) {
            leftControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                const value = leftControl?.value;
                if (!value) return;

                obj.set("left", parseFloat(value)).setCoords();
                this.canvas.requestRenderAll();
            };
            if (obj.left) {
                leftControl.value = `${obj.left.toFixed(1)}`;
            }
            if (obj.left === 0 || obj.left === -0) {
                leftControl.value = `${0}`;
            }
        }

        let topControl: HTMLInputElement | null = $("top-control") as HTMLInputElement;
        if (topControl) {
            topControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                const value = topControl?.value;
                if (!value) return;

                obj.set("top", parseFloat(value)).setCoords();
                this.canvas.requestRenderAll();
            };
            if (obj.top) {
                topControl.value = `${obj.top.toFixed(1)}`;
            }
            if (obj.top === 0 || obj.top === -0) {
                topControl.value = `${0}`;
            }
        }
        let skewXRange: HTMLInputElement | null = $("skewX-range") as HTMLInputElement;
        let skewXControl: HTMLInputElement | null = $("skewX-control") as HTMLInputElement;
        if (skewXRange) {
            skewXRange.oninput = (e) => {
                const value = skewXRange?.value;
                if (!value) return;

                const skew = parseFloat(value);
                obj.set("skewX", skew).setCoords();
                this.canvas.requestRenderAll();

                if (skewXControl) {
                    // @ts-ignore
                    skewXControl.value = `${(obj.skewX).toFixed(1)}`;
                }
            };

            if (obj.skewX) {
                skewXRange.value = `${obj.skewX.toFixed(1)}`;
            }
            if (obj.skewX === 0 || obj.skewX === -0) {
                skewXRange.value = `${0}`;
            }
        }
        if (skewXControl) {
            skewXControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                let _value = skewXControl?.value;
                let value: Number;
                if (!_value) {
                    value = 0;
                } else {
                    value = parseFloat(skewXControl?.value as string);
                }

                // @ts-ignore
                const skew = parseFloat(value);
                obj.set("skewX", skew).setCoords();
                this.canvas.requestRenderAll();

                if (skewXRange) {
                    // @ts-ignore
                    skewXRange.value = `${(obj.skewX).toFixed(1)}`;
                }
            };
            if (obj.skewX) {
                skewXControl.value = `${obj.skewX.toFixed(1)}`;
            }
            if (obj.skewX === 0 || obj.skewX === -0) {
                skewXControl.value = `${0}`;
            }
        }

        let skewYRange: HTMLInputElement | null = $("skewY-range") as HTMLInputElement;
        let skewYControl: HTMLInputElement | null = $("skewY-control") as HTMLInputElement;
        if (skewYRange) {
            skewYRange.oninput = (e) => {
                const value = skewYRange?.value;
                if (!value) return;

                const skew = parseFloat(value);
                obj.set("skewY", skew).setCoords();
                this.canvas.requestRenderAll();

                if (skewYControl) {
                    // @ts-ignore
                    skewYControl.value = `${(obj.skewY).toFixed(1)}`;
                }
            };

            if (obj.skewY) {
                skewYRange.value = `${(obj.skewY).toFixed(1)}`;
            }
            if (obj.skewY === 0 || obj.skewY === -0) {
                skewYRange.value = `${0}`;
            }
        }
        if (skewYControl) {
            skewYControl.onkeypress = (e) => {
                if (e.key !== "Enter") return;

                let _value = skewYControl?.value;
                let value: Number;
                if (!_value) {
                    value = 0;
                } else {
                    value = parseFloat(skewYControl?.value as string);
                }

                // @ts-ignore
                obj.set("skewY", value);
                this.canvas.requestRenderAll();

                if (skewYRange) {
                    // @ts-ignore
                    skewYRange.value = `${(obj.skewX).toFixed(1)}`;
                }
            };
            if (obj.skewY) {
                skewYControl.value = `${obj.skewY.toFixed(1)}`;
            }
            if (obj.skewY === 0 || obj.skewY === -0) {
                skewYControl.value = `${0}`;
            }
        }

        /*
        var topControl: HTMLInputElement | null = $('top-control') as HTMLInputElement;

        topControl.oninput = (value: any) => {
          obj.set('top', parseInt(value, 10)).setCoords();
          this.canvas.requestRenderAll();
        };

        var leftControl: HTMLInputElement | null = $('left-control') as HTMLInputElement;

        leftControl.oninput = (value: any) => {
          obj.set('left', parseInt(value, 10)).setCoords();
          this.canvas.requestRenderAll();
        };

        var skewXControl: HTMLInputElement | null = $('skewX-control') as HTMLInputElement;

        skewXControl.oninput = (value: any) => {
          obj.set('skewX', parseInt(value, 10)).setCoords();
          this.canvas.requestRenderAll();
        };

        var skewYControl: HTMLInputElement | null = $('skewY-control') as HTMLInputElement;

        skewYControl.oninput = (value: any) => {
          obj.set('skewY', parseInt(value, 10)).setCoords();
          this.canvas.requestRenderAll();
        };

        scaleControl.value = obj.scaleX;

        leftControl.value = obj.left;
        topControl.value = obj.top;
        skewXControl.value = obj.skewX;
        skewYControl.value = obj.skewY;
         */
    }

    undo(): void {
        this.stateManager.undo();
    }

    redo(): void {
        this.stateManager.redo();
    }

    private saveState() {
        this.stateManager.saveState();
        this.canvas.renderAll();
    }

    downloadCanvasAsPng() {
        let grid = false;
        if (this.isGridVisible) {
            this.hideGrid();
            grid = true;
        }
        this.canvas.discardActiveObject().renderAll();

        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", "banner.png");

        let _canvas = document.getElementById("artBoard");
        // @ts-ignore
        _canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob);

            downloadLink.setAttribute("href", url);
            downloadLink.click();
        });

        if (grid) {
            this.showGrid();
        }
    }

    private imageOnClick(e) {
        const target = e.target || e.srcElement;

        if (target && target instanceof Element) {
            const element = target as Element;
            const src: string = element.getAttribute("src") as string;
            addItem(src, this.canvas);
        }
    }

    setTabId(tabId) {
        this.setState({tabId: tabId});
    }

    public render() {
        return (
            <section className="default-page default-page--banner-builder">
                <canvas id='artBoard' width='1200' height='400' style={{border: "1px solid #ccc"}}/>
                <DeleteControl />
                <div className="quick-access-bar">
                    <div className="tab-navigation">
                        <button type="button" onClick={() => this.setTabId(1)} className={`${this.state.tabId === 1 ? "active" : ""}`}>
                            Controls
                        </button>
                        <button type="button" onClick={() => this.setTabId(4)} className={`${this.state.tabId === 4 ? "active" : ""}`}>
                            My Cats
                        </button>
                        <button type="button" onClick={() => this.setTabId(3)} className={`${this.state.tabId === 3 ? "active" : ""}`}>
                            Backgrounds
                        </button>
                        <button type="button" onClick={() => this.setTabId(2)} className={`${this.state.tabId === 2 ? "active" : ""}`}>
                            Images
                        </button>
                    </div>
                    <div className="controls">
                        <UndoControl />
                        <RedoControl />
                        <ChangeBackgroundColorControl />
                        <FlipControls />
                        <SelectAllControl />
                        <DeselectControl />
                        <GroupControl />
                        <UngroupControl />
                        <SendBackwards />
                        <BringForwards />
                        <SendToBack />
                        <BringToFront />
                    </div>
                </div>
                <div className='tabs'>
                    <div className={`tab ${this.state.tabId === 1 ? "open" : ""}`}>
                        <div className='controls'>
                            <div className="controls-group">
                                <h3>Transform</h3>
                                <LeftControl />
                                <TopControl />
                                <AngleControl />
                                <ScaleControl />
                                <SkewXControl />
                                <SkewYControl />
                            </div>
                            <div className="grid-options">
                                <h3>Grid</h3>
                                <GridAlignmentControl />
                                <ShowGridControl />
                                <GridDensityControl />
                            </div>
                            <div className="advanced-options">
                                <h3>Settings</h3>
                                <RotationSnappingOption />
                                <ImageEdgeSnappingOption />
                            </div>
                        </div>
                        <DownloadControl />
                    </div>
                    <div className={`tab ${this.state.tabId === 2 ? "open" : ""}`}>
                        <div id='images-outer'>
                            <div className='images' id='images'></div>
                        </div>
                    </div>
                    <div className={`tab ${this.state.tabId === 3 ? "open" : ""}`}>
                        <div id='images-outer'>
                            <div className='images' id='bgs'></div>
                        </div>
                    </div>
                    <div className={`tab ${this.state.tabId === 4 ? "open" : ""}`}>
                      <div id="owned-cats">
                        {this.context.getCollection(NftListType.CATS).map((nft) => {
                          return <CleanImage key={ nft.token_id } source={nft.ipfs_image} onClick={this.imageOnClick} />
                        })}
                        {!this.context.getCollection(NftListType.CATS).isLoaded() && <p style={{textAlign: 'center', width: '100%', paddingTop: '60px'}}>Please connect your wallet.</p>}
                      </div>
                    </div>
                </div>
            </section>
        )
    }
}
