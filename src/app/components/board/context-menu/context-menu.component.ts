import { Component, HostListener, OnInit } from '@angular/core';

import { BoardConverseService } from '@services/board-converse.service';
import { ZIndexService } from '@services/z-index.service';

import { BoardItemComponent } from '@components/board/board-item/board-item.component';

@Component({
    selector: 'sui-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.less'],
})
export class ContextMenuComponent implements OnInit {
    public top: string;
    public left: string;
    public boardItem: BoardItemComponent;

    public _componentsLayer: string;

    @HostListener('contextmenu', ['$event'])
    _onCOntextMenu(e: MouseEvent): void {
        e.preventDefault();
    }

    constructor(public boardConverseService: BoardConverseService, public zIndexService: ZIndexService) {}

    ngOnInit(): void {
        this._componentsLayer = this.zIndexService.getComponentsLayer(this.boardItem);
    }

    /**
     * This function increase z-index of the board-item component.
     * @memberof ContextMenuComponent
     */
    public _goUp(): void {
        if (this.boardItem) {
            this.zIndexService.moveItem(this.boardItem, 1);
        }
    }

    /**
     * This function decrease z-index of the board-item component.
     * @memberof ContextMenuComponent
     */
    public _goDown(): void {
        if (this.boardItem) {
            this.zIndexService.moveItem(this.boardItem, -1);
        }
    }

    /**
     * This function delete board-item component.
     * @memberof ContextMenuComponent
     */
    public _delete(): void {
        if (this.boardItem) {
            this.boardConverseService.removeBoardItemComponent(this.boardItem);
        }
    }
}
