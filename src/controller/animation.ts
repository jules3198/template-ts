import { Matrix } from "../animation/matrix";
import { Vector } from "../animation/vector";
import { TimezoneProvider } from "../data/timezone-provider";
import { Timezone, Vector2D } from "../models/models";
import { multiply } from "../utils/matrix";
import { generateRandomNumber, generateUniqueKey, htmlToElement, matrixArrayToCssMatrix } from "../utils/utils";
import { WatchListManager } from "./watch-list-manager";

export class WatchAnimationController {

    private watchElement: HTMLElement;
    private matrixController: Matrix;
    private vector: Vector;
    private currentMatrix: number[][];

    constructor() {
        this.matrixController = new Matrix();
        this.vector = new Vector();
    }

    init() {
        const template = `
        <div id="animationContainer">
            <button class="animatio-buttons" id="rotate"> Rotate </button>
        </div>
        `;

        const animatedWatchContainer = document.getElementById('animation-buttons');
        const animationButtons = htmlToElement(template);
        animatedWatchContainer.appendChild(animationButtons);

        this.initEventListeners();
    }

    generateWatch() {

        const timezoneProvider = new TimezoneProvider();
        const animationControllerContainer = document.getElementById('animation-buttons');
        const watchListManager = new WatchListManager();

        if (animationControllerContainer) {
            const watchId = generateUniqueKey();
            const randomTimezone: Timezone = timezoneProvider.provide(generateRandomNumber());
            watchListManager.addIndependantWatch(watchId, randomTimezone, 'animation-watch');
            this.watchElement = document.getElementById(`watch-${watchId}`);
            this.currentMatrix = this.matrixController.provideMatrix();
            this.watchElement.style.transform = matrixArrayToCssMatrix(this.currentMatrix);
        }

    }

    initEventListeners(): void {
        const rotateBtn = document.getElementById('rotate');
        //const scaleBtn = document.getElementById('scale');
        //const translationBtn = document.getElementById('translate');
        // const addbtn = document.getElementById('addBtn');
        rotateBtn.addEventListener('click', () => this.rotate());
        //scaleBtn.addEventListener('click', () => this.scale());
        //translationBtn.addEventListener('click', () => this.translate());
    }

    private rotate(): void {
        const rotateMatrix = this.matrixController.rotateAroundPoint(45);
        this.apllyMatrix(rotateMatrix);
    }

    private translate(): void {
        const vector: Vector2D = this.vector.provideVector(-50, 50);
        const translateMatrix = this.matrixController.translation(this.currentMatrix, vector);
        this.apllyMatrix(translateMatrix);
    }

    private scale(): void {
        const vector: Vector2D = this.vector.provideVector(-2, 2);
        const scaleMatrix = this.matrixController.scaling(this.currentMatrix, vector);
        this.apllyMatrix(scaleMatrix);
    }

    private apllyMatrix(matrix: number[][]): void {
        this.currentMatrix = multiply(this.currentMatrix, matrix);
        this.watchElement.style.transform = matrixArrayToCssMatrix(this.currentMatrix);
    }

}