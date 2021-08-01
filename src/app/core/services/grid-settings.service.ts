import { Injectable } from '@angular/core';
import { IGridSettings } from '@models/grid.model';
import { BoardSettingsService } from '@services/board-settings.service';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

/**
 * @class A service class that provides an interface for interacting with a canvas grid running on the side of the central canvas
 */
export class GridSettingsService {
    //Grid default settings
    private gridSetting: IGridSettings = {
        activeStatus: true,
        scale: 15,
        strokeWidth: 0.1,
    };

    private subscriptions: Subscription = new Subscription();

    /**
     * @return Returns the activity of the grid running state
     */
    get gridStatus(): boolean {
        return this.gridSetting.activeStatus;
    }

    /**
     * @return Returns the current state of the scaled mesh
     */
    get gridScale(): number {
        return this.gridSetting.scale;
    }

    /**
     * @return Returns the width of the mesh stroke (smaller is thinner and vice versa)
     */
    get gridStrokeWidth(): number {
        return this.gridSetting.strokeWidth;
    }

    /**
     * Changes the active state of the mesh
     * @param value - binary values of grid on / off
     */
    public setGridStatus(value: boolean): void {
        this.gridSetting.activeStatus = value;
    }

    /**
     * Changes the active state of the scale
     * @param value - set new grid scale state
     */
    public setGridScale(value: number): void {
        this.gridSetting.scale = value;
    }

    /**
     * Changes the grid stroke width
     * @param value - set new grid stroke width
     */
    public setGridStrokeWidth(value: number): void {
        this.gridSetting.strokeWidth = value;
    }

    /**
     * The main method responsible for rendering the mesh canvas. The principle of operation is quite simple. The input parameter is the canvas where the mesh is embedded.
     * In a specific case, this is the central panel of the project.
     * Depending on the current width of the window, the grid will be redrawn every time.
     * Depending on the current scale, you can change the distance between the grid lines.
     * @param ctx - canvas (context) where the mesh is embedded.
     */
    public drawGrid(ctx: CanvasRenderingContext2D): void {
        if (!this.gridStatus) {
            this.stopGridSubscribe();
        } else {
            this.subscriptions.add(
                this.boardSettingsService.boardParametres$.subscribe(value => {
                    const canvasWidth: number = value[0];
                    const canvasHeight: number = value[1];
                    ctx.canvas.width = canvasWidth;
                    ctx.canvas.height = canvasHeight;
                    ctx.beginPath();
                    ctx.lineWidth = this.gridStrokeWidth;
                    for (let position: number = 0; position <= canvasWidth; position = position + this.gridScale) {
                        ctx.moveTo(position, 0);
                        ctx.lineTo(position, canvasHeight);
                    }
                    for (let position: number = 0; position <= canvasHeight; position = position + this.gridScale) {
                        ctx.moveTo(0, position);
                        ctx.lineTo(canvasWidth, position);
                    }
                    ctx.stroke();
                    ctx.closePath();
                })
            );
        }
    }

    /**
     * Method for unsubscribe board's data changes
     */
    public stopGridSubscribe(): void {
        this.subscriptions.unsubscribe();
    }

    constructor(private boardSettingsService: BoardSettingsService) {}
}
