import { Injectable } from '@angular/core';

import { BoardItemComponent } from '@components/board/board-item/board-item.component';

import { ZIndexObj, Layer } from '@models/z-index.model';

@Injectable({
    providedIn: 'root',
})
export class ZIndexService {
    private zIndexState: ZIndexObj = { 0: [] };

    /**
     * This function returns a current layer of the board-item component.
     * @param {BoardItemComponent} boardItem - The board-item which index we are looking for.
     * @returns  {string} - The layer the component is currently on. 'Default' if it's on 0. Numeric if it's somewhere else.
     * @memberof ZIndexService
     */
    public getComponentsLayer(boardItem: BoardItemComponent): string {
        if (boardItem.zIndexShift === 0) return 'default';
        return boardItem.zIndexShift.toString();
    }

    /**
     * This function registers a new component on 0 (default) layer.
     * @param {BoardItemComponent} boardItem - The component is been just created.
     * @memberof ZIndexService
     */
    public addNewItem(boardItem: BoardItemComponent): void {
        this.addItemToLayer(0, boardItem);
    }

    /**
     * Remove a component from z-index layers when it has deleted.
     * @param {BoardItemComponent} boardItem - The board-item component to remove.
     * @memberof ZIndexService
     */
    public removeItem(boardItem: BoardItemComponent): void {
        const currentLevel: number = boardItem.zIndexShift;

        this.zIndexState[currentLevel] = this.zIndexState[currentLevel].filter(item => {
            return item != boardItem;
        });

        // Delete layer if its empty but not 0 level.
        if (this.zIndexState[currentLevel].length === 0) {
            this.deleteLayer(currentLevel);
        }

        this.shakeLayers();
    }

    /**
     * This function moves a component on a different z-index level.
     * @param {BoardItemComponent} boardItem - A board-item component to move.
     * @param {number} shiftStep - A difference with current level. Pass 1 for invrease. Pass -1 for decrease.
     * @memberof ZIndexService
     */
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

        this.shakeLayers();
    }

    /**
     * This function removes empty spaces between layers indexes. For example we have [-2, 0, 2, 4, 5, 7] layers.
     * This function shakes this array and squashes layers together so it will be like this [-1, 0, 1, 2, 3, 4].
     * @private
     * @memberof ZIndexService
     */
    private shakeLayers(): void {
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

        this.shakeHalfAxis(positiveDegreeAxis, 1);
        this.shakeHalfAxis(negativeDegreeAxis, -1);
    }

    /**
     * This function is a part of shakeLayers logic. It takes all negative or all positive layers indexes and removes
     * empty spaces between.
     * @private
     * @param {Array<number>} layersAxis - An array of existing layers indexes.
     * @param {number} [direction=1] - A key that indicates if it positive or negative part of the zIndexState.
     * @memberof ZIndexService
     */
    private shakeHalfAxis(layersAxis: Array<number>, direction: number = 1): void {
        for (let i = 0; i < layersAxis.length; i++) {
            const bubble: Layer = this.zIndexState[layersAxis[i]];
            this.deleteLayer(layersAxis[i]);
            this.zIndexState[(i + 1) * direction] = bubble;

            bubble.forEach(boardItem => {
                boardItem.zIndexShift = (i + 1) * direction;
            });
        }
    }

    /**
     * This function assigns a board-item to a new layer.
     * @private
     * @param {number} num - A layer index.
     * @param {BoardItemComponent} boardItem - A board-item to move.
     * @memberof ZIndexService
     */
    private addItemToLayer(num: number, boardItem: BoardItemComponent): void {
        if (!this.zIndexState[num]) {
            this.zIndexState[num] = [];
        }
        this.zIndexState[num].push(boardItem);
    }

    /**
     * This function deletes a layer on the zIndexState.
     * @private
     * @param {number} num - An index of the layer to remove.
     * @memberof ZIndexService
     */
    private deleteLayer(num: number): void {
        if (num != 0) delete this.zIndexState[num];
    }
}
