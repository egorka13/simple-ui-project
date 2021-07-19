import {
    Component,
    ComponentFactoryResolver,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ViewContainerRef,
    ChangeDetectorRef,
    Renderer2,
    OnDestroy,
    NgZone,
} from '@angular/core';

import { BoardSettingsService } from '@services/board-settings.service';
import { IDragMetadata } from '@components/board/board.model';

import { InputComponent } from '@library-components/input/input.component'; // TODO: remove this and add logic.

@Component({
    selector: 'sui-board-item',
    templateUrl: './board-item.component.html',
    styleUrls: ['./board-item.component.less'],
})
export class BoardItemComponent implements AfterViewInit, OnDestroy {
    @ViewChild('place', { read: ViewContainerRef })
    place: ViewContainerRef;

    @ViewChild('holder')
    holder: ElementRef;

    private toUnlisten: Array<() => void> = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        private boardItem: ElementRef,
        private r2: Renderer2,
        private ngZone: NgZone,
        public boardSettingsService: BoardSettingsService
    ) {}

    ngAfterViewInit(): void {
        this.addComponent();
        this.cd.detectChanges();
        this.setMoveListener();
    }

    ngOnDestroy(): void {
        this.toUnlisten.forEach(unlistener => {
            unlistener();
        });
    }

    // TODO: rework this and add logic here.
    private addComponent(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(InputComponent);
        this.place.createComponent(componentFactory);
    }

    /**
     * This function checks if component goes outside the board field.
     * If true returns new coordinates corresponding to the component on last available postition.
     * @private
     * @param {number} x - x position of the component (top left corner).
     * @param {number} y - y position of the component (top left corner).
     * @returns  {[newX: number, newY: number]} - Conponent's coordinates.
     * @memberof BoardItemComponent
     */
    private disignateBorder(x: number, y: number): [newX: number, newY: number] {
        const nativeEl: HTMLElement = this.boardItem.nativeElement as HTMLElement;

        let newX: number = x;
        let newY: number = y;

        if (nativeEl.offsetLeft + x < 0) {
            newX = nativeEl.offsetLeft;
        }
        if (nativeEl.offsetLeft + nativeEl.offsetWidth + x > this.boardSettingsService.width) {
            newX = this.boardSettingsService.width - nativeEl.offsetLeft - nativeEl.offsetWidth;
        }
        if (nativeEl.offsetTop + y < 0) {
            newY = -nativeEl.offsetTop;
        }
        if (nativeEl.offsetTop + nativeEl.offsetHeight + y > this.boardSettingsService.height) {
            newY = this.boardSettingsService.height - nativeEl.offsetTop - nativeEl.offsetHeight;
        }

        return [newX, newY];
    }

    /**
     * This function sets listeners of the mouse events to drag component.
     * @private
     * @memberof BoardItemComponent
     */
    private setMoveListener(): void {
        const onMouseDown: (e: MouseEvent) => void = e => {
            if (this.boardSettingsService.isInteractiveMode) return;

            e.preventDefault();

            const styles: CSSStyleDeclaration = getComputedStyle(this.boardItem.nativeElement);
            // prettier-ignore
            const transformMatrix: Array<string> = styles.transform.match(/-?\d+(\.\d+)?/g) ||
                                                   [ '1', '0', '0', '1', '0', '0'];

            const dragMetadata: IDragMetadata = {
                startPosition: {
                    x: e.clientX,
                    y: e.clientY,
                },
                prevShift: {
                    x: +transformMatrix[4] * this.boardSettingsService.scale,
                    y: +transformMatrix[5] * this.boardSettingsService.scale,
                },
            };

            const onMove: (e: MouseEvent) => void = e => {
                const shiftX: number = e.clientX - dragMetadata.startPosition.x;
                const shiftY: number = e.clientY - dragMetadata.startPosition.y;

                let computedX = (dragMetadata.prevShift.x + shiftX) / this.boardSettingsService.scale;
                let computedY = (dragMetadata.prevShift.y + shiftY) / this.boardSettingsService.scale;

                if (!this.boardSettingsService.isInfiniteBoardMode) {
                    [computedX, computedY] = this.disignateBorder(computedX, computedY);
                }

                const transformString: string = `translate(${computedX}px, ${computedY}px)`;

                this.r2.setStyle(this.boardItem.nativeElement, 'transform', transformString);
            };

            let unlistenMouseMove: () => void;
            this.ngZone.runOutsideAngular(() => {
                unlistenMouseMove = this.r2.listen('document', 'mousemove', onMove);
            });

            const unlistenMouseUp = this.r2.listen('document', 'mouseup', () => {
                unlistenMouseMove();
                unlistenMouseUp();
            });
        };

        this.toUnlisten.push(this.r2.listen(this.boardItem.nativeElement, 'mousedown', onMouseDown));
    }
}
