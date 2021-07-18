import { Component, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDragMetadata } from './board.model';
import { BoardSettingsService } from '@services/board-settings.service';

@Component({
    selector: 'sui-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.less'],
})
export class BoardComponent implements AfterViewInit, OnDestroy {
    public _showDragPannel: boolean = false;
    public _dragging: boolean = false;

    private toUnsubscribe: Array<Subscription> = [];

    @ViewChild('field')
    field: ElementRef;

    @ViewChild('fieldMovePlug')
    fieldMovePlug: ElementRef;


    constructor(public boardSettingsService: BoardSettingsService) {}

    ngAfterViewInit(): void {
        this.setSpaceHoldListener();
        this.setMoveListener();
        this.setZoomListener();
    }

    ngOnDestroy(): void {
        this.toUnsubscribe.forEach(sub => {
            sub.unsubscribe();
        });
    }

    /**
     * This function sets up a listener of the mouse wheel on the document.
     * Changes the board scale on the wheel spin via boardSettingsService.
     * @private
     * @memberof BoardComponent
     */
    private setZoomListener(): void {
        const wheel$: Observable<WheelEvent> = fromEvent<WheelEvent>(document, 'wheel', { passive: false }).pipe(
            filter(e => e.ctrlKey),
            map(e => {
                e.preventDefault();
                return e;
            })
        );

        const changeScale: (deltaY: number) => void = deltaY => {
            if (!deltaY) return;
            this.boardSettingsService.enableSmoothTransition();
            this.boardSettingsService.changeScale(-deltaY / Math.abs(deltaY));
        };

        this.toUnsubscribe.push(wheel$.subscribe({ next: e => changeScale(e.deltaY) }));
    }

    /**
     * Function is a part of a logic provides an ability to move a board across the page.
     * For doing this you have to hold a space button then you can grab the board (move-plug actually).
     * While the button is pressed it summons a move-plug atop the board.
     * So here contains listeners for the space button.
     * @private
     * @memberof BoardComponent
     */
    private setSpaceHoldListener(): void {
        const spacePressed: () => void = () => {
            if (!this._showDragPannel) {
                this._showDragPannel = true;
            }
        };

        const spaceReleased: () => void = () => {
            if (this._showDragPannel) {
                this._dragging = false;
                this._showDragPannel = false;
            }
        };

        const spaceDown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
            filter(e => e.code === 'Space')
        );
        const spaceUp$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
            filter(e => e.code === 'Space')
        );

        this.toUnsubscribe.push(spaceDown$.subscribe({ next: spacePressed }));
        this.toUnsubscribe.push(spaceUp$.subscribe({ next: spaceReleased }));
    }

    // TODO: Maybe move this logic to a separate class because it will be the same for board-item.
    /**
     * This function sets listeners of mouse events to the move-plug of the board.
     * Logic of shifting the board is contained here.
     * @private
     * @memberof BoardComponent
     */
    private setMoveListener(): void {
        const mouseDown$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.fieldMovePlug.nativeElement, 'mousedown');
        const mouseUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.fieldMovePlug.nativeElement, 'mouseup');
        const mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.fieldMovePlug.nativeElement, 'mousemove');
        const dblclick$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.fieldMovePlug.nativeElement, 'dblclick');

        // prevent default drag event.
        this.fieldMovePlug.nativeElement.ondragstart = () => {
            return false;
        };

        const dragMetadata: IDragMetadata = {
            startPosition: {
                x: 0,
                y: 0,
            },
            prevShift: {
                x: 0,
                y: 0,
            },
        };

        // Function is called on mousedown. Provoking the move listener to emits events.
        // Save a starting mouse position and a current shift of the board if it exists.
        const dragStart: (e: MouseEvent) => void = e => {
            this._dragging = true;

            dragMetadata.startPosition.x = e.clientX;
            dragMetadata.startPosition.y = e.clientY;

            const styles: CSSStyleDeclaration = getComputedStyle(this.field.nativeElement);
            // prettier-ignore
            const transformMatrix: Array<string> = styles.transform.match(/-?\d+(\.\d+)?/g) ||
                                                   [ '1', '0', '0', '1', '0', '0'];

            dragMetadata.prevShift.x = +transformMatrix[4];
            dragMetadata.prevShift.y = +transformMatrix[5];
        };

        // Function is called on mousemove. Changing the board's shift to a new value.
        const move: (e: MouseEvent) => void = e => {
            const shiftX: number = e.clientX - dragMetadata.startPosition.x;
            const shiftY: number = e.clientY - dragMetadata.startPosition.y;

            this.boardSettingsService.translateX =
                (dragMetadata.prevShift.x + shiftX) / this.boardSettingsService.scale;
            this.boardSettingsService.translateY =
                (dragMetadata.prevShift.y + shiftY) / this.boardSettingsService.scale;
        };

        // Function is called on mouseup. Provoking the move listener to ignore mouse events.
        const dragEnd: () => void = () => {
            this._dragging = false;
        };

        // Function is called on dblclick. Restoring the board's shift to 0.
        const resetPosition: () => void = () => {
            this.boardSettingsService.enableSmoothTransition();
            this.boardSettingsService.translateX = 0;
            this.boardSettingsService.translateY = 0;
        };

        this.toUnsubscribe.push(
            mouseDown$.pipe(filter(() => !this.boardSettingsService.isTransition)).subscribe({ next: dragStart })
        );
        this.toUnsubscribe.push(mouseMove$.pipe(filter(() => this._dragging)).subscribe({ next: move }));
        this.toUnsubscribe.push(mouseUp$.subscribe({ next: dragEnd }));
        this.toUnsubscribe.push(dblclick$.subscribe({ next: resetPosition }));
    }
}