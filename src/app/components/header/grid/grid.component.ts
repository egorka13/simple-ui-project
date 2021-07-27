import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GridSettingsService } from '@services/grid-settings.service';
import { BoardSettingsService } from '@services/board-settings.service';

@Component({
    selector: 'sui-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.less'],
})
/**
 * @class The controller class responsible for rendering the grid
 */
export class GridComponent implements OnInit, AfterViewInit {
    constructor(public gridSettingsService: GridSettingsService, public boardSettingsService: BoardSettingsService) {}

    @ViewChild('suiGrid')
    suiGrid: ElementRef;

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.initGrid();
    }

    /**
     * The main method responsible for drawing the grid canvas on the center board when turned on
     * @see GridSettingsService
     */
    public initGrid(): void {
        const ctx: CanvasRenderingContext2D = this.suiGrid.nativeElement.getContext('2d');
        this.gridSettingsService.drawGrid(ctx);
    }
}