import {
    Component,
    ComponentFactoryResolver,
    ComponentFactory,
    Type,
    ViewChild,
    ElementRef,
    ViewContainerRef,
    ComponentRef,
    HostListener,
    HostBinding,
    Renderer2,
    NgZone,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { BoardSettingsService } from '@services/board-settings.service';
import { BoardConverseService } from '@services/board-converse.service';

import { componentModels } from '@models/config-panel.model';
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

    public _isSelected: boolean = false;
    public properties: IConfigPanelProperty;
    public libComponentName: string;

    private innerLibComponent: ComponentRef<any>;
    private toUnlisten: Array<() => void> = [];
    private deleteUnlistener: () => void;

    private menuSubscription: Subscription;
    private zIndexBase: number = 100;
    private zIndexShiftState: number = 0;
    private zIndexString: string = `z-index: ${this.zIndexBase + this.zIndexShiftState}`;

    @HostBinding('style')
    get _zIndex(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(this.zIndexString);
    }

    @HostListener('dblclick')
    _selectLibComponent(): void {
        if (this.boardSettingsService.isInteractiveMode) return;
        if (this._isSelected) return;

        this._isSelected = true;
        this.boardConverseService.selectBoardItem(this);
        this.setDeleteKeyListener();
    }

    @HostListener('contextmenu', ['$event'])
    _showRightClickMenu(e: MouseEvent): void {
        e.preventDefault();

        this.boardConverseService.showContextMenu(e.clientX, e.clientY, this);
    }

    constructor(
        public boardSettingsService: BoardSettingsService,
        public boardConverseService: BoardConverseService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private boardItem: ElementRef,
        private r2: Renderer2,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer
    ) {}

    get zIndexShift(): number {
        return this.zIndexShiftState;
    }
    set zIndexShift(zIndex: number) {
        this.zIndexShiftState = zIndex;
        this.zIndexString = `z-index: ${this.zIndexBase + this.zIndexShiftState}`;
    }

    ngAfterViewInit(): void {
        this.setMoveListener();
    }

    ngOnDestroy(): void {
        this.toUnlisten.forEach(unlistener => {
            unlistener();
        });

        if (this.deleteUnlistener) {
            this.deleteUnlistener();
        }

        if (this.menuSubscription) {
            this.menuSubscription.unsubscribe();
        }
    }

    /**
     * This function adds a library component inside the boardItem.
     * @template LibraryComponent
     * @param {Type<LibraryComponent>} libraryComponent - Library component.
     * @memberof BoardItemComponent
     */
    public appendLibComponent<LibraryComponent>(libraryComponent: Type<LibraryComponent>): void {
        const componentFactory: ComponentFactory<LibraryComponent> =
            this.componentFactoryResolver.resolveComponentFactory<LibraryComponent>(libraryComponent);

        this.libComponentName = componentFactory.selector.toLowerCase();

        if (componentModels[this.libComponentName]) {
            this.properties = this.objDeepCopy(componentModels[this.libComponentName]);
        }

        setTimeout(() => {
            this.innerLibComponent = this.viewContainerTarget.createComponent<LibraryComponent>(componentFactory);

            for (const key in this.properties) {
                // TODO: Fix types here
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this.innerLibComponent.instance[key] = this.properties[key].value;
            }
        }, 0);
    }

    /**
     * This function updates properties of the current boardItem.
     * @param {IConfigPanelProperty} config - Updated property.
     * @memberof BoardItemComponent
     */
    public updateLibComponent(config: IConfigPanelProperty): void {
        for (const key in config) {
            // TODO: Fix types here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            this.innerLibComponent.instance[key] = config[key].value;
        }

        setTimeout(() => {
            const styles: CSSStyleDeclaration = getComputedStyle(this.boardItem.nativeElement);
            // prettier-ignore
            const transformMatrix: Array<string> = styles.transform.match(/-?\d+(\.\d+)?/g) ||
                                                   [ '1', '0', '0', '1', '0', '0'];

            let x = +transformMatrix[4];
            let y = +transformMatrix[5];

            if (!this.boardSettingsService.isInfiniteBoardMode) {
                [x, y] = this.disignateBorder(x, y);
            }

            const transformString: string = `translate(${x}px, ${y}px)`;

            this.r2.setStyle(this.boardItem.nativeElement, 'transform', transformString);
        });
    }

    /**
     * This function deselect current boardItem.
     * @memberof BoardItemComponent
     */
    public deselect(): void {
        this._isSelected = false;
        this.deleteUnlistener();
    }

    /**
     * This function does deep copy of an object.
     * @private
     * @template Obj
     * @param {Obj} obj - An object to copy.
     * @returns  {Obj} - A copy of the object.
     * @memberof BoardItemComponent
     */
    private objDeepCopy<Obj>(obj: Obj): Obj {
        // Later may be changed to lodash or any other implementation.
        return JSON.parse(JSON.stringify(obj)) as Obj;
    }

    /**
     * This functio sets a listener of the delete key and delete current selected component when it is pressed.
     * @private
     * @memberof BoardItemComponent
     */
    private setDeleteKeyListener(): void {
        this.deleteUnlistener = this.r2.listen(document, 'keydown.delete', () => {
            this.boardConverseService.removeLibraryComponent();
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
