import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { BoardConverseService } from './board-converse.service';

import { IPoint } from '@models/board.model';

@Injectable({
    providedIn: 'root',
})
export class BoardSettingsService {
    private scaleState: number = 1;
    private minScale: number = 0.3;
    private translateState: IPoint = {
        x: 0,
        y: 0,
    };
    private smoothTransition: boolean = false;
    private smoothTransitionTO: ReturnType<typeof setTimeout>;
    private heightState: number = 650;
    private widthState: number = 1080;
    private boardElement: HTMLElement;
    private boardMargin: number = 400;
    private isInteractiveModeState: boolean = false;

    public isInfiniteBoardMode: boolean = false; // Mode that allows to use all visible space as a board.

    public transformStyle$ = new Subject<string>(); // Listener contsins computed transform style.

    public boardParametres$ = new BehaviorSubject<Array<number>>([this.widthState, this.heightState]);

    constructor(public boardConverseService: BoardConverseService) {}

    // Current board scale.
    get scale(): number {
        return this.scaleState;
    }

    public setScale(value:number){
        this.scaleState = value;
        this.updateTransformStyle();
    }

    // Current board shift relatve to start position.
    get translateX(): number {
        return this.translateState.x;
    }
    set translateX(x: number) {
        this.translateState.x = x;
        this.updateTransformStyle();
    }
    get translateY(): number {
        return this.translateState.y;
    }
    set translateY(y: number) {
        this.translateState.y = y;
        this.updateTransformStyle();
    }

    // Displays if board's 'smooth transition' enabled right now.
    get isTransition(): boolean {
        return this.smoothTransition;
    }

    // Current board height and width.
    get height(): number {
        return this.heightState;
    }
    set height(height: number) {
        this.translateState.x = 0;
        this.translateState.y = 0;

        this.heightState = height;
        this.normalizeScale();

        this.boardParametres$.next([this.width, height]);

        this.enableSmoothTransition();
        this.updateTransformStyle();
    }
    get width(): number {
        return this.widthState;
    }
    set width(width: number) {
        this.translateState.x = 0;
        this.translateState.y = 0;

        this.widthState = width;
        this.normalizeScale();

        this.boardParametres$.next([width, this.height]);
        
        this.enableSmoothTransition();
        this.updateTransformStyle();
    }

    // Mode that allows user activates library components on the board.
    get isInteractiveMode(): boolean {
        return this.isInteractiveModeState;
    }
    set isInteractiveMode(value: boolean) {
        this.isInteractiveModeState = value;
        this.boardConverseService.selectBoardItem(null);
    }

    /**
     * This method binds the board HTMLElement to boardSettingsService.
     * @param {HTMLElement} board - sui-board (host) element.
     * @memberof BoardSettingsService
     */
    public setBoardElement(board: HTMLElement): void {
        this.boardElement = board;
    }

    /**
     * This method provides an ability to change a board scale.
     * A 'scaleValue' is a difference between new and old scales, measured in 10%, sign sensitive.
     * So if you wanna zoom out from 100% to 80% you have to call changeScale(-2);
     * For 110% to 115% -> changeScale(0.5);
     * The board scale cannot be less then 30% and more then 200%.
     * @param {number} scaleValue - Amount of zoom.
     * @memberof BoardSettingsService
     */
    public changeScale(scaleValue: number): void {
        this.scaleState += 0.1 * scaleValue;

        if (this.scaleState > 2) {
            this.scaleState = 2;
        }

        if (this.scaleState < this.minScale) {
            this.scaleState = this.minScale;
        }

        this.scaleState = Math.round(this.scaleState * 100) / 100;

        this.updateTransformStyle();
    }

    /**
     * This method sets up ._smooth css modifier on the board.
     * It applies 0.3s transition to all transforms of the board for 0.3s.
     * Include debounce.
     * @memberof BoardSettingsService
     */
    public enableSmoothTransition(): void {
        if (this.smoothTransitionTO) clearTimeout(this.smoothTransitionTO);
        this.smoothTransition = true;

        this.smoothTransitionTO = setTimeout(() => {
            this.smoothTransition = false;
        }, 300); // 300ms is a kinda magic number. In fact this is 0.3s duration of a smooth transition inside '._smooth'.
    }

    /**
     * This function computes and updates actual transform style.
     * @private
     * @memberof BoardSettingsService
     */
    private updateTransformStyle(): void {
        this.transformStyle$.next(
            `scale(${this.scaleState}) translate(${this.translateState.x}px, ${this.translateState.y}px)`
        );
    }

    /**
     * This function computes a scale value while chaning the board size so the board always stay fully inside the screen.
     * @private
     * @memberof BoardSettingsService
     */
    private normalizeScale(): void {
        if (!this.boardElement) return;

        const computedWidthMinScale: number = (this.boardElement.offsetWidth - this.boardMargin) / this.width;
        const computedHeightMinScale: number = this.boardElement.offsetHeight / this.height;

        const computedMinScale = Math.floor(Math.min(computedHeightMinScale, computedWidthMinScale) * 100) / 100;

        this.minScale = computedMinScale < 0.3 ? computedMinScale : 0.3;

        if (computedMinScale < 1) {
            this.scaleState = Math.min(computedMinScale, this.scale);
        } else {
            this.scaleState = Math.max(this.minScale, Math.min(this.scale, 1));
        }
    }
}
