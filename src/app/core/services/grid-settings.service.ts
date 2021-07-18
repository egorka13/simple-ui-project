import { Injectable } from '@angular/core';
import { IGridSettings } from '../../components/grid/grid.model';
import { BoardSettingsService } from './board-settings.service';

@Injectable({
  providedIn: 'root'
})
export class GridSettingsService {

  private gridSetting: IGridSettings = {
    activeStatus: true,
    scale: 10,
    strokeWidth: .1,
  };

  get gridStatus():boolean {
    return this.gridSetting.activeStatus;
  }

  get gridScale():number{
    return this.gridSetting.scale;
  }

  get gridStrokeWidth():number{
    return this.gridSetting.strokeWidth;
  }

  public setGridStatus(value: boolean): void {
    this.gridSetting.activeStatus = value;
  }

  public setGridScale(value: number):void{
    this.gridSetting.scale = value;
  }

  public setGridStrokeWidth(value: number):void{
    this.gridSetting.strokeWidth = value;
  }

  public drawGrid(ctx:CanvasRenderingContext2D):void{
    ctx.canvas.width = this.boardSettingsService.width;
    ctx.canvas.height = this.boardSettingsService.height;
    ctx.beginPath();
    ctx.lineWidth = this.gridStrokeWidth
    for(let position:number = 0; position <= this.boardSettingsService.width; position = position + this.gridScale){
      ctx.moveTo(position, 0);
      ctx.lineTo(position, this.boardSettingsService.height);
    }

    for(let position:number = 0; position <= this.boardSettingsService.height; position = position + this.gridScale){
      ctx.moveTo(0, position);
      ctx.lineTo(this.boardSettingsService.width, position);
    }
    ctx.stroke();
    ctx.closePath();
  }
  constructor(private boardSettingsService:BoardSettingsService) { }
}
