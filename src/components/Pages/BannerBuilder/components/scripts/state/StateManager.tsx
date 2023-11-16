// @ts-nocheck
import { fabric } from 'fabric'
import * as $ from 'jquery';
import App from "../../../BannerBuilder";

export class StateManager {
  private currentState: string;
  private undoList: string[];
  private redoList: string[];
  private locked: boolean;
  private maxCount: number = 50;

  private app: App;

  private undoButton: HTMLButtonElement;
  private redoButton: HTMLButtonElement;

  constructor(readonly canvas: fabric.Canvas, app: App) {
    this.app = app;

    this.currentState = canvas.toDatalessJSON();
    this.locked = false;

    this.undoList = [];
    this.redoList = [];

    this.undoButton = document.getElementById("undo") as HTMLButtonElement;
    this.redoButton = document.getElementById("redo") as HTMLButtonElement;

    this.initialiseUndoRedo($);
  }

  saveState() {
    if (this.locked) {
      return;
    }
    if (this.undoList.length === this.maxCount) {
      this.undoList.shift();
    }

    this.undoList.push(this.currentState);

    this.currentState = this.canvas.toDatalessJSON(["selectable", "evented"]);

    this.redoList.length = 0;
  }

  undo(callback?: Function) {
    if (this.undoList.length > 0) {
      // @ts-ignore
      this.applyState(this.redoList, this.undoList.pop(), callback);

      this.redoButton.disabled = false;
    }
    if (this.undoList.length === 0) {
      this.undoButton.disabled = true;
    }
  }

  redo(callback?: Function) {
    if (this.redoList.length > 0) {
      // @ts-ignore
      this.applyState(this.undoList, this.redoList.pop(), callback);

      this.undoButton.disabled = false;
    }
    if (this.redoList.length === 0) {
      this.redoButton.disabled = true;
    }
  }

  private applyState(stack: string[], newState: string, callback?: Function) {
    stack.push(this.currentState);

    this.currentState = newState;

    this.locked = true;
    this.canvas.loadFromJSON(this.currentState, () => {
      if (callback !== undefined) {
        callback();
      }
      this.locked = false;

      if (this.app.isGridVisible) {
        this.app.showGrid();
      }
    });
  }

  private initialiseUndoRedo($: any) {
    this.initialiseUndoRedoCanvasEvents();
    this.initialiseUndoRedoButtons($);
  }

  private initialiseUndoRedoCanvasEvents() {
    this.canvas.on("object:modified", (e) => {
      // @ts-ignore
      if (!e.target.evented) {
        return;
      }
      this.saveState();
      this.undoButton.disabled = false;
    });

    this.canvas.on("object:added", (e) => {
      // @ts-ignore
      if (!e.target.evented) {
        return;
      }
      this.saveState();
      this.undoButton.disabled = false;
    });
  }

  private initialiseUndoRedoButtons($: any) {
    $("#undo").on("click", () => {
      this.undo();
    });

    $("#redo").on("click", () => {
      this.redo();
    });
  }
}
