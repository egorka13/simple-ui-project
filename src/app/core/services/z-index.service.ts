import { Injectable } from '@angular/core';

import { BoardItemComponent } from '@components/board/board-item/board-item.component';

import { ZIndexObj, Layer } from '@models/z-index.model';

@Injectable({
    providedIn: 'root',
})
export class ZIndexService {
    private zIndexState: ZIndexObj = { 0: [] };

    public getComponentsLayer(boardItem: BoardItemComponent): string {
        if (boardItem.zIndexShift === 0) return 'default';
        return boardItem.zIndexShift.toString();
    }

    public addNewItem(boardItem: BoardItemComponent): void {
        this.addItemToLayer(0, boardItem);
    }

    public deleteItem(boardItem: BoardItemComponent): void {
        const currentLevel: number = boardItem.zIndexShift;

        this.zIndexState[currentLevel] = this.zIndexState[currentLevel].filter(item => {
            return item != boardItem;
        });

        // Delete layer if its empty but not 0 level.
        if (this.zIndexState[currentLevel].length === 0) {
            this.deleteLayer(currentLevel);
        }

        this.clearLayers();
    }

    public moveItem(boardItem: BoardItemComponent, shiftStep: number): void {
        const currentLevel: number = boardItem.zIndexShift;

        this.zIndexState[currentLevel] = this.zIndexState[currentLevel].filter(item => {
            return item != boardItem;
        });

        boardItem.zIndexShift += shiftStep;
        this.addItemToLayer(boardItem.zIndexShift, boardItem);

        // Delete layer if its empty but not 0 level.
        if (this.zIndexState[currentLevel].length === 0) {
            this.deleteLayer(currentLevel);
        }

        this.clearLayers();
    }

    private clearLayers(): void {
        const strings: Array<string> = Object.keys(this.zIndexState)
            .sort((a, b) => {
                return +a - +b;
            })
            .join(' ')
            .split('0')
            .map((s: string) => s.trim());

        //prettier-ignore
        const negativeDegreeAxis: Array<number> =
            strings[0].length === 0 ? [] : strings[0].split(' ').map((s: string) => +s).reverse();
        const positiveDegreeAxis: Array<number> =
            strings[1].length === 0 ? [] : strings[1].split(' ').map((s: string) => +s);

        this.shakeLayers(positiveDegreeAxis, 1);
        this.shakeLayers(negativeDegreeAxis, -1);
    }

    private shakeLayers(layersAxis: Array<number>, direction: number = 1): void {
        for (let i = 0; i < layersAxis.length; i++) {
            const bubble: Layer = this.zIndexState[layersAxis[i]];
            this.deleteLayer(layersAxis[i]);
            this.zIndexState[(i + 1) * direction] = bubble;

            bubble.forEach(boardItem => {
                boardItem.zIndexShift = (i + 1) * direction;
            });
        }
    }

    private addItemToLayer(num: number, boardItem: BoardItemComponent): void {
        if (!this.zIndexState[num]) {
            this.zIndexState[num] = [];
        }
        this.zIndexState[num].push(boardItem);
    }

    private deleteLayer(num: number): void {
        if (num != 0) delete this.zIndexState[num];
    }
}
