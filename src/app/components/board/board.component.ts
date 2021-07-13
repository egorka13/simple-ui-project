import { Component, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IDragMetadata } from './board.model';

@Component({
    selector: 'sui-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.less'],
})
export class BoardComponent implements AfterViewInit, OnDestroy {
    public showDragPannel: boolean = false;
    public dragging: boolean = false;
    public smoothTransition: boolean = false;

    private toUnsubscribe: Array<Subscription> = [];

    @ViewChild('field')
    field: ElementRef;

    @ViewChild('fieldMovePlug')
    fieldMovePlug: ElementRef;

    ngAfterViewInit(): void {
        this.setSpaceHoldListener();
        this.setMoveListener();
    }

    ngOnDestroy() {
        this.toUnsubscribe.forEach(sub => {
            sub.unsubscribe();
        });
    }

    /**
     * Function is a part of a logic provides an ability to move a board across the page.
     * For doing this you have to hold a space button then you can grab the board (move-plug actually).
     * While the button is pressed it summons move-plug atop the board.
     * So here contains listener for the space button.
     * @private
     * @memberof BoardComponent
     */
    private setSpaceHoldListener(): void {
        const spacePressed: () => void = () => {
            if (!this.showDragPannel) {
                this.showDragPannel = true;
            }
        };

        const spaceReleased: () => void = () => {
            if (this.showDragPannel) {
                this.dragging = false;
                this.showDragPannel = false;
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
     * Logic of shifting the board contains here.
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

        // Function is called on mousedown. Provoke the move listener to emits events.
        // Save a starting mouse position and a current shift of the board if it exists.
        const dragStart: (e: MouseEvent) => void = e => {
            this.dragging = true;

            dragMetadata.startPosition.x = e.clientX;
            dragMetadata.startPosition.y = e.clientY;

            const styles: CSSStyleDeclaration = getComputedStyle(this.field.nativeElement);
            const transformMatrix: Array<string> = styles.transform.match(/-?\d+/g) || ['0', '0', '0', '0', '0', '0'];
            dragMetadata.prevShift.x = +transformMatrix[4];
            dragMetadata.prevShift.y = +transformMatrix[5];
        };

        // Function is called on mousemove. Change the board's shift to a new value.
        const onMove: (e: MouseEvent) => void = e => {
            const shiftX: number = e.clientX - dragMetadata.startPosition.x;
            const shiftY: number = e.clientY - dragMetadata.startPosition.y;
            this.field.nativeElement.style.transform = `translate(${dragMetadata.prevShift.x + shiftX}px, ${
                dragMetadata.prevShift.y + shiftY
            }px)`;
        };

        // Function is called on mouseup. Provoke the move listener to ignore events.
        const dragEnd: () => void = () => {
            this.dragging = false;
        };

        // Function is called on dblclick. Restore the board's shift to 0.
        const resetPosition: () => void = () => {
            this.smoothTransition = true;
            this.field.nativeElement.style.transform = `translate(0px, 0px)`;

            setTimeout(() => {
                this.smoothTransition = false;
            }, 300); // 300ms is a kinda magic number. In fact this is 0.3s duration of a smooth transition inside '._smooth'.
        };

        this.toUnsubscribe.push(mouseDown$.pipe(filter(() => !this.smoothTransition)).subscribe({ next: dragStart }));
        this.toUnsubscribe.push(mouseMove$.pipe(filter(() => this.dragging)).subscribe({ next: onMove }));
        this.toUnsubscribe.push(mouseUp$.subscribe({ next: dragEnd }));
        this.toUnsubscribe.push(dblclick$.subscribe({ next: resetPosition }));
    }
}
