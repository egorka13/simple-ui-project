import {
    Component,
    ComponentFactoryResolver,
    ComponentFactory,
    Type,
    ViewChild,
    ElementRef,
    ViewContainerRef,
    ComponentRef,
    Renderer2,
    NgZone,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';

import { BoardSettingsService } from '@services/board-settings.service';

import { IDragMetadata } from '@models/board.model';
import { IConfigPanelProperty } from '@models/config-panel.model';

@Component({
    selector: 'sui-board-item',
    templateUrl: './board-item.component.html',
    styleUrls: ['./board-item.component.less'],
})
export class BoardItemComponent implements AfterViewInit, OnDestroy {
    @ViewChild('viewContainerTarget', { read: ViewContainerRef })
    viewContainerTarget: ViewContainerRef;

    @ViewChild('holder')
    holder: ElementRef;

    public _selected: boolean = false;
    public properties: IConfigPanelProperty[];
    public libComponentName: string;

    private innerLibComponent: ComponentRef<any>;
    private toUnlisten: Array<() => void> = [];

    constructor(
        public boardSettingsService: BoardSettingsService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private boardItem: ElementRef,
        private r2: Renderer2,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit(): void {
        this.setMoveListener();
    }

    ngOnDestroy(): void {
        this.toUnlisten.forEach(unlistener => {
            unlistener();
        });
    }

    public appendLibComponent<LibraryComponent>(
        libraryComponent: Type<LibraryComponent>,
        properties: IConfigPanelProperty[]
    ): void {
        this.properties = properties;
        const componentFactory: ComponentFactory<LibraryComponent> =
            this.componentFactoryResolver.resolveComponentFactory<LibraryComponent>(libraryComponent);

        setTimeout(() => {
            this.innerLibComponent = this.viewContainerTarget.createComponent<LibraryComponent>(componentFactory);
            this.libComponentName = this.innerLibComponent.componentType.name;
            //this.tagName = this.innerLibComponent.location.nativeElement.localName as string;
            this.setLibComponentProps();
        }, 0);
    }

    public updateLibComponent(config: IConfigPanelProperty[]): void {
        this.properties = config;
        this.setLibComponentProps();
    }

    public _selectLibComponent(): void {
        this._selected = true;
        this.boardSettingsService.selectBoardItem(this);
    }

    public deselect(): void {
        this._selected = false;
    }

    private setLibComponentProps(): void {
        console.log(this.innerLibComponent); // TODO: delete this.
        this.properties.forEach(property => {
            this.innerLibComponent.instance[property.name] = property.value;
        });
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
            newX = -nativeEl.offsetLeft;
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

            const unlistenMouseUp: () => void = this.r2.listen('document', 'mouseup', () => {
                unlistenMouseMove();
                unlistenMouseUp();
            });
        };

        this.toUnlisten.push(this.r2.listen(this.boardItem.nativeElement, 'mousedown', onMouseDown));
    }
}
