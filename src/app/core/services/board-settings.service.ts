import { Injectable } from '@angular/core';
import { IPoint } from '@components/board/board.model';
import { Subject, BehaviorSubject } from 'rxjs';

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

    public boardParametres$ = new BehaviorSubject<Array<number>>([this.widthState, this.heightState]);

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

    // Listener contsins computed transform style.
    public transformStyle$: Subject<string> = new Subject<string>();

    public isInteractiveMode: boolean = false;
    public isInfiniteBoardMde: boolean = false;

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
        this.enableSmoothTransition();
        this.updateTransformStyle();

        this.heightState = height;
        this.noramalizeScale();

        this.boardParametres$.next([this.width, height]);
    }
    get width(): number {
        return this.widthState;
    }
    set width(width: number) {
        this.translateState.x = 0;
        this.translateState.y = 0;
        this.enableSmoothTransition();
        this.updateTransformStyle();
        this.widthState = width;
        this.noramalizeScale();

        this.boardParametres$.next([width, this.height]);
    }

    public setBoardElement(board: HTMLElement): void {
        this.boardElement = board;
    }

    private noramalizeScale(): void {
        if (this.boardElement) {
            const computedWidthMinScale: number = this.boardElement.offsetWidth / this.width;
            const computedHeightMinScale: number = this.boardElement.offsetHeight / this.height;

            const computedMinScale = Math.floor(Math.min(computedHeightMinScale, computedWidthMinScale) * 100) / 100;

            this.minScale = computedMinScale < 0.3 ? computedMinScale : 0.3;

            if (computedMinScale < 1) {
                this.scaleState = Math.min(computedMinScale, this.scale);
                this.updateTransformStyle();
            }
        }
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
}