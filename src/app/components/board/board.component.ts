import {
    Component,
    ComponentFactoryResolver,
    ComponentFactory,
    Type,
    Renderer2,
    NgZone,
    ViewChild,
    ElementRef,
    ViewContainerRef,
    ComponentRef,
    OnDestroy,
    AfterViewInit,
    HostBinding,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BoardSettingsService } from '@services/board-settings.service';
import { BoardConverseService } from '@services/board-converse.service';

import { InputComponent } from '@library-components/input/input.component'; // TODO: remove this and add logic.
import { CheckboxComponent } from '@library-components/checkbox/checkbox.component'; // TODO: remove this and add logic.
import { BoardItemComponent } from './board-item/board-item.component';

import { IDragMetadata } from '@models/board.model';
import { IConfigPanelProperty } from '@models/config-panel.model';

@Component({
    selector: 'sui-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.less'],
})
export class BoardComponent implements AfterViewInit, OnDestroy {
    @ViewChild('field')
    field: ElementRef;

    @ViewChild('viewContainerTarget', { read: ViewContainerRef })
    fieldView: ViewContainerRef;

    @ViewChild('fieldMovePlug')
    fieldMovePlug: ElementRef;

    @HostBinding('class._infinite')
    get infinite(): boolean {
        return this.boardSettingsService.isInfiniteBoardMode;
    }

    public _showDragPanel: boolean = false;
    public _dragging: boolean = false;

    private boardItems: Array<any> = [];
    private toUnsubscribe: Array<Subscription> = [];
    private toUnlisten: Array<() => void> = [];

    private dragMetadata: IDragMetadata = {
        startPosition: {
            x: 0,
            y: 0,
        },
        prevShift: {
            x: 0,
            y: 0,
        },
    };

    constructor(
        public boardSettingsService: BoardSettingsService,
        public boardConverseService: BoardConverseService,
        public boardElement: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private r2: Renderer2,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit(): void {
        this.boardSettingsService.setBoardElement(this.boardElement.nativeElement);
        this.toUnsubscribe.push(this.boardConverseService.setConfigPanelListener());

        this.setSpaceHoldListener();
        this.setMoveListener();
        this.setZoomListener();
        this.setAddComponentListener();

        // Setting up a starting board size.
        setTimeout(() => {
            this.boardSettingsService.height = 650;
            this.boardSettingsService.width = 1080;
        }, 0);
    }

    ngOnDestroy(): void {
        this.toUnsubscribe.forEach(sub => {
            sub.unsubscribe();
        });

        this.toUnlisten.forEach(unlistener => {
            unlistener();
        });
    }

    // ---------- Showcase of adding new component to the board. ----------
    public _addComponentDemo1(): void {
        this.boardConverseService.addLibraryComponent(InputComponent, {
            placeholder: {
                value: 'Some default placeholder',
                type: 'text',
            },
            size: {
                value: 'large',
                type: 'select',
                options: ['default', 'small', 'large'],
            },
        });
    }
    public _addComponentDemo2(): void {
        this.boardConverseService.addLibraryComponent(InputComponent, {
            placeholder: {
                value: 'Some default placeholder',
                type: 'text',
            },
            size: {
                value: 'small',
                type: 'select',
                options: ['default', 'small', 'large'],
            },
        });
    }
    public _addComponentDemo3(): void {
        this.boardConverseService.addLibraryComponent(CheckboxComponent, {
            labelText: {
                value: 'Checkbox label',
                type: 'text',
            },
            isDisabled: {
                value: false,
                type: 'select',
                options: ['false', 'true'],
            },
            isChecked: {
                value: false,
                type: 'select',
                options: ['false', 'true'],
            },
        });
    }
    // --------------------------------------------------------------------

    private setAddComponentListener(): void {
        const addLibComponent = <LibraryComponent>([libraryComponent, config]: [
            Type<LibraryComponent>,
            IConfigPanelProperty
        ]) => {
            const componentFactory: ComponentFactory<BoardItemComponent> =
                this.componentFactoryResolver.resolveComponentFactory(BoardItemComponent);
            const boardItem: ComponentRef<BoardItemComponent> = this.fieldView.createComponent(componentFactory);

            boardItem.instance.appendLibComponent(libraryComponent, config);

            this.boardItems.push(boardItem);
        };

        this.toUnsubscribe.push(this.boardConverseService.addLibraryComponent$.subscribe(addLibComponent));
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
        const unlistenSpaceDown = this.r2.listen('document', 'keydown.space', () => {
            if (this._showDragPanel) return;

            this._showDragPanel = true;

            const unlistenSpaceUp: () => void = this.r2.listen('document', 'keyup.space', () => {
                unlistenSpaceUp();

                this._dragging = false;
                this._showDragPanel = false;
            });
        });

        this.toUnlisten.push(unlistenSpaceDown);
    }

    // TODO: Maybe move this logic to a separate class because it will be the same for board-item.
    /**
     * This function sets listeners of mouse events to the move-plug of the board.
     * Logic of shifting the board is contained here.
     * @private
     * @memberof BoardComponent
     */
    private setMoveListener(): void {
        const setMetadata: (e: MouseEvent) => void = e => {
            this._dragging = true;

            this.dragMetadata.startPosition.x = e.clientX;
            this.dragMetadata.startPosition.y = e.clientY;

            const styles: CSSStyleDeclaration = getComputedStyle(this.field.nativeElement);
            // prettier-ignore
            const transformMatrix: Array<string> = styles.transform.match(/-?\d+(\.\d+)?/g) ||
                                                   ['1', '0', '0', '1', '0', '0'];

            this.dragMetadata.prevShift.x = +transformMatrix[4];
            this.dragMetadata.prevShift.y = +transformMatrix[5];
        };

        // Function is called on mousemove. Changing the board's shift to a new value.
        const onMove: (e: MouseEvent) => void = e => {
            const shiftX: number = e.clientX - this.dragMetadata.startPosition.x;
            const shiftY: number = e.clientY - this.dragMetadata.startPosition.y;

            this.boardSettingsService.translateX =
                (this.dragMetadata.prevShift.x + shiftX) / this.boardSettingsService.scale;
            this.boardSettingsService.translateY =
                (this.dragMetadata.prevShift.y + shiftY) / this.boardSettingsService.scale;
        };

        const onMouseUp: () => void = () => {
            this._dragging = false;
        };

        const onMouseDown: (e: MouseEvent) => void = e => {
            if (this.boardSettingsService.isTransition) return;

            e.preventDefault();

            setMetadata(e);

            let unlistenMouseMove: () => void;
            this.ngZone.runOutsideAngular(() => {
                unlistenMouseMove = this.r2.listen('document', 'mousemove', onMove);
            });

            const unlistenMouseUp: () => void = this.r2.listen('document', 'mouseup', () => {
                onMouseUp();
                unlistenMouseMove();
                unlistenMouseUp();
            });
        };

        // Restoring the board's shift to 0.
        const onDblClick: () => void = () => {
            this.boardSettingsService.enableSmoothTransition();
            this.boardSettingsService.translateX = 0;
            this.boardSettingsService.translateY = 0;
        };

        this.toUnlisten.push(this.r2.listen(this.fieldMovePlug.nativeElement, 'mousedown', onMouseDown));
        this.toUnlisten.push(this.r2.listen(this.fieldMovePlug.nativeElement, 'dblclick', onDblClick));
    }
}
