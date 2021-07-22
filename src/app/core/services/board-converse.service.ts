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

    public addLibraryComponent$ = new Subject<[Type<any>, IConfigPanelProperty[]]>();

    public addLibraryComponent<LibraryComponent>(
        libraryComponent: Type<LibraryComponent>,
        properties: IConfigPanelProperty[]
    ): void {
        this.addLibraryComponent$.next([libraryComponent, properties]);
    }

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

    public setConfigPanelListener(): Subscription {
        return this.configDataService.saveConfigData$.subscribe((properties: IConfigPanelProperty[]) => {
            if (!this.selectedBoardItem) return;
            this.selectedBoardItem.updateLibComponent(properties);
        });
    }
}
