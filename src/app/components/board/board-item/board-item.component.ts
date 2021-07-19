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

import { InputComponent } from '@library-components/input/input.component';
import { BoardSettingsService } from '@services/board-settings.service';
import { IDragMetadata } from '@components/board/board.model';

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

    private toUnsubscribe: Array<() => void> = [];
    private unlistenMouseMove: () => void;
    private unlistenMouseUp: () => void;

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
        this.toUnsubscribe.forEach(unlistener => {
            unlistener();
        });
    }

    addComponent(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(InputComponent);
        this.place.createComponent(componentFactory);
    }

    setMoveListener(): void {
        const unlistenMouseDown = this.r2.listen(this.boardItem.nativeElement, 'mousedown', (e: MouseEvent) => {
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

            const disignateBorder: (x: number, y: number) => [newX: number, newY: number] = (x, y) => {
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

                console.log(newX);
                return [newX, newY];
            };

            const move: (e: MouseEvent) => void = e => {
                const shiftX: number = e.clientX - dragMetadata.startPosition.x;
                const shiftY: number = e.clientY - dragMetadata.startPosition.y;

                let computedX = (dragMetadata.prevShift.x + shiftX) / this.boardSettingsService.scale;
                let computedY = (dragMetadata.prevShift.y + shiftY) / this.boardSettingsService.scale;

                if (!this.boardSettingsService.isInfiniteBoardMode) {
                    [computedX, computedY] = disignateBorder(computedX, computedY);
                }

                const transformString: string = `translate(${computedX}px, ${computedY}px)`;

                this.r2.setStyle(this.boardItem.nativeElement, 'transform', transformString);
            };

            this.ngZone.runOutsideAngular(() => {
                this.unlistenMouseMove = this.r2.listen('document', 'mousemove', move);
            });

            this.unlistenMouseUp = this.r2.listen('document', 'mouseup', () => {
                this.unlistenMouseMove();
                this.unlistenMouseUp();
            });
        });

        this.toUnsubscribe.push(unlistenMouseDown);
    }
}
