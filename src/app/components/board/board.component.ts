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
    HostListener,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BoardSettingsService } from '@services/board-settings.service';
import { BoardConverseService } from '@services/board-converse.service';

import { BoardItemComponent } from './board-item/board-item.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

import { IDragMetadata } from '@models/board.model';

@Component({
    selector: 'sui-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.less'],
})
export class BoardComponent implements AfterViewInit, OnDestroy {
    @ViewChild('field')
    field: ElementRef;

    @ViewChild('viewComponentsContainer', { read: ViewContainerRef })
    componentsContainerView: ViewContainerRef;

    @ViewChild('viewContextMenuContainer', { read: ViewContainerRef })
    contextMenuView: ViewContainerRef;

    @ViewChild('fieldMovePlug')
    fieldMovePlug: ElementRef;

    @HostBinding('class._infinite')
    get infinite(): boolean {
        return this.boardSettingsService.isInfiniteBoardMode;
    }

    public _isDragPanelShown: boolean = false;
    public _isDragging: boolean = false;

    private boardItems: Array<ComponentRef<BoardItemComponent>> = [];
    private toUnsubscribe: Subscription = new Subscription();
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

    @HostListener('dblclick', ['$event'])
    _onDeselect(e: MouseEvent): void {
        if (e.target === this.field.nativeElement) {
            this.boardConverseService.selectBoardItem(null);
        }
    }

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
        this.toUnsubscribe.add(this.boardConverseService.setConfigPanelListener());

        this.setSpaceHoldListener();
        this.setMoveListener();
        this.setZoomListener();
        this.setAddComponentListener();
        this.setRemoveComponentListener();
        this.setWipeBoardListener();
        this.setContextMenuListener();

        // Setting up a starting board size.
        setTimeout(() => {
            this.boardSettingsService.height = 650;
            this.boardSettingsService.width = 1080;
        }, 0);
    }

    ngOnDestroy(): void {
        this.toUnsubscribe.unsubscribe();

        this.toUnlisten.forEach(unlistener => {
            unlistener();
        });
    }

    /**
     * This function sets up a listener of the board converse service that waiting for a context menu call.
     * When it emits the board component creates a context menu component and positions it.
     * Once a user presses anywhere on the page the context menu is deleted.
     * @private
     * @memberof BoardComponent
     */
    private setContextMenuListener(): void {
        const createContextMenu = ([x, y, boardItem]: [number, number, BoardItemComponent]) => {
            const componentFactory: ComponentFactory<ContextMenuComponent> =
                this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent);

            const menuComponentRef: ComponentRef<ContextMenuComponent> =
                this.contextMenuView.createComponent(componentFactory);

            menuComponentRef.instance.left = x.toString() + 'px';
            menuComponentRef.instance.top = y.toString() + 'px';

            menuComponentRef.instance.boardItem = boardItem;

            const destroySubscriptions: Array<() => void> = [];

            const destroyContextMenu: () => void = () => {
                menuComponentRef.destroy();
                destroySubscriptions.forEach(unsubscribe => {
                    unsubscribe();
                });
            };

            destroySubscriptions.push(
                this.r2.listen(document, 'keydown', () => {
                    setTimeout(() => {
                        destroyContextMenu();
                    });
                })
            );

            destroySubscriptions.push(
                this.r2.listen(menuComponentRef.location.nativeElement, 'click', () => {
                    setTimeout(() => {
                        destroyContextMenu();
                    });
                })
            );
        };

        this.toUnsubscribe.add(this.boardConverseService.showContextMenu$.subscribe(createContextMenu));
    }

    /**
     * This function sets up a listener of the board converse service that waiting for
     * a board-item create event.
     * @private
     * @memberof BoardComponent
     */
    private setAddComponentListener(): void {
        const addLibComponent = <LibraryComponent>(libraryComponent: Type<LibraryComponent>) => {
            const componentFactory: ComponentFactory<BoardItemComponent> =
                this.componentFactoryResolver.resolveComponentFactory(BoardItemComponent);
            const boardItem: ComponentRef<BoardItemComponent> =
                this.componentsContainerView.createComponent(componentFactory);

            boardItem.instance.appendLibComponent(libraryComponent);

            this.boardItems.push(boardItem);
        };

        this.toUnsubscribe.add(this.boardConverseService.addLibraryComponent$.subscribe(addLibComponent));
    }

    /**
     * This function sets up a listener of the board converse service that waiting for
     * a remove selected board-item event.
     * @private
     * @memberof BoardComponent
     */
    private setRemoveComponentListener(): void {
        const removeLibComponent: (boardItemComponent: BoardItemComponent) => void = boardItemComponent => {
            const itemRef: ComponentRef<BoardItemComponent> = this.boardItems.filter(
                (item: ComponentRef<BoardItemComponent>) => {
                    return item.instance === boardItemComponent;
                }
            )[0];

            const index: number = this.boardItems.indexOf(itemRef);
            this.boardItems.splice(index, 1);
            itemRef.destroy();
        };

        this.toUnsubscribe.add(this.boardConverseService.removeLibraryComponent$.subscribe(removeLibComponent));
    }

    /**
     * This function sets up a listener that deletes all board-item components from the board.
     * @private
     * @memberof BoardComponent
     */
    private setWipeBoardListener(): void {
        this.toUnsubscribe.add(
            this.boardConverseService.wipeBoard$.subscribe(() => {
                this.boardItems.forEach((item: ComponentRef<BoardItemComponent>) => {
                    item.destroy();
                });
                this.boardItems = [];
            })
        );
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

        this.toUnsubscribe.add(wheel$.subscribe({ next: e => changeScale(e.deltaY) }));
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
            if (this._isDragPanelShown) return;

            this._isDragPanelShown = true;

            const unlistenSpaceUp: () => void = this.r2.listen('document', 'keyup.space', () => {
                unlistenSpaceUp();

                this._isDragging = false;
                this._isDragPanelShown = false;
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
            this._isDragging = true;

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
            this._isDragging = false;
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
