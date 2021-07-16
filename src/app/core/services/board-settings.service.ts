import { Injectable } from '@angular/core';
import { IPoint } from '@components/board/board.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BoardSettingsService {
    private scaleState: number = 1;
    private translateState: IPoint = {
        x: 0,
        y: 0,
    };
    private smoothTransition: boolean = false;
    private smoothTransitionTO: ReturnType<typeof setTimeout>;
    private heightState: number = 650;
    private widthState: number = 1080;

    // Current board scale.
    get scale(): number {
        return this.scaleState;
    }

    // Current board shift relatve to start position.
    get translateX(): number {
        return this.translateState.x;
    }
    set translateX(x: number) {
        this.translateState.x = x;
        this.UpdateTransformStyle();
    }
    get translateY(): number {
        return this.translateState.y;
    }
    set translateY(y: number) {
        this.translateState.y = y;
        this.UpdateTransformStyle();
    }

    // Listener contsins computed transform style.
    public transformStyle$: Subject<string> = new Subject<string>();

    /**
     * This function computes and updates actual transform style.
     * @private
     * @memberof BoardSettingsService
     */
    private UpdateTransformStyle() {
        this.transformStyle$.next(
            `scale(${this.scaleState}) translate(${this.translateState.x}px, ${this.translateState.y}px)`
        );
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
        this.heightState = height;
    }
    get width(): number {
        return this.widthState;
    }
    set width(width: number) {
        this.widthState = width;
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
    public changeScale(scaleValue: number) {
        this.scaleState += 0.1 * scaleValue;

        if (this.scaleState > 2) {
            this.scaleState = 2;
        }

        if (this.scaleState < 0.3) {
            this.scaleState = 0.3;
        }

        this.scaleState = Math.round(this.scaleState * 100) / 100;

        this.UpdateTransformStyle();
    }

    /**
     * This method sets up ._smooth css modifier on the board.
     * It applies 0.3s transition to all transforms of the board for 0.3s.
     * Include debounce.
     * @memberof BoardSettingsService
     */
    public enableSmoothTransition() {
        if (this.smoothTransitionTO) clearTimeout(this.smoothTransitionTO);
        this.smoothTransition = true;

        this.smoothTransitionTO = setTimeout(() => {
            this.smoothTransition = false;
        }, 300); // 300ms is a kinda magic number. In fact this is 0.3s duration of a smooth transition inside '._smooth'.
    }
}
