import { Injectable, Type } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { ConfigDataService } from '@services/config-data.service';

import { BoardItemComponent } from '@components/board/board-item/board-item.component';

import { IConfigPanelProperty } from '@models/config-panel.model';

@Injectable({
    providedIn: 'root',
})
export class BoardConverseService {
    constructor(public configDataService: ConfigDataService) {}

    public selectedBoardItem: BoardItemComponent | null = null;

    // TODO: Consider an asObserver here.
    public addLibraryComponent$ = new Subject<Type<any>>();
    // TODO: Consider an asObserver here.
    public removeLibraryComponent$ = new Subject<BoardItemComponent>();
    // TODO: Consider an asObserver here.
    public showContextMenu$ = new Subject<[number, number, BoardItemComponent]>();
    // TODO: Consider an asObserver here.
    public wipeBoard$ = new Subject();
    public zIndexChange$: Subject<number> = new Subject();

    /**
     * This function append library component to the board.
     * @template LibraryComponent
     * @param {Type<LibraryComponent>} libraryComponent - Library Component to append.
     * @memberof BoardConverseService
     */
    public addLibraryComponent<LibraryComponent>(libraryComponent: Type<LibraryComponent>): void {
        this.addLibraryComponent$.next(libraryComponent);
    }

    /**
     * This function deletes all board-item components on the board.
     * @memberof BoardConverseService
     */
    public wipeBoard(): void {
        this.selectedBoardItem = null;
        this.configDataService.setConfigData(null);
        this.wipeBoard$.next();
    }

    /**
     * This function remove transmitted board-item.
     * @param {BoardItemComponent} boardItem - Component to remove.
     * @memberof BoardConverseService
     */
    public removeBoardItemComponent(boardItem: BoardItemComponent): void {
        this.removeLibraryComponent$.next(boardItem);

        if (boardItem === this.selectedBoardItem) {
            this.selectedBoardItem = null;
            this.configDataService.setConfigData(null);
        }
    }

    /**
     * This function remove current selected component from the board.
     * @memberof BoardConverseService
     */
    public removeSelectedComponent(): void {
        if (this.selectedBoardItem) {
            this.removeLibraryComponent$.next(this.selectedBoardItem);
            this.selectedBoardItem = null;
            this.configDataService.setConfigData(null);
        }
    }

    public showContextMenu(x: number, y: number, boardItem: BoardItemComponent): void {
        this.showContextMenu$.next([x, y, boardItem]);
    }

    /**
     * This function is used when user selects boardItem component.
     * It sends config of the current boardItem to the config-data service.
     * @param {(BoardItemComponent | null)} selectedBoardItem - Selected component.
     * @returns  {void}
     * @memberof BoardConverseService
     */
    public selectBoardItem(selectedBoardItem: BoardItemComponent | null): void {
        if (this.selectedBoardItem === selectedBoardItem) return;

        if (this.selectedBoardItem) {
            this.selectedBoardItem.deselect();
        }
        this.selectedBoardItem = selectedBoardItem;

        if (this.selectedBoardItem === null) {
            this.configDataService.setConfigData(null);
            return;
        }

        const suiComponentTag: string = this.selectedBoardItem.libComponentName;

        this.configDataService.setConfigData({
            suiComponent: suiComponentTag,
            properties: this.selectedBoardItem.properties,
        });
    }

    /**
     * This function sets up a listener of an update event from the config-data service.
     * @returns  {Subscription}
     * @memberof BoardConverseService
     */
    public setConfigPanelListener(): Subscription {
        return this.configDataService.saveConfigData$.subscribe((properties: IConfigPanelProperty) => {
            if (!this.selectedBoardItem) return;
            this.selectedBoardItem.updateLibComponent(properties);
        });
    }
}
