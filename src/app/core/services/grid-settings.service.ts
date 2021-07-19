import { Injectable } from '@angular/core';
import { IGridSettings } from '../../components/grid/grid.model';
import { BoardSettingsService } from './board-settings.service';
import {Subject} from 'rxjs';

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
    this.boardSettingsService.boardParametres$.subscribe(value => {
      let canvasWidth:number = Number(value[0]);
      let canvasHeight:number = Number(value[1]);
      ctx.canvas.width = canvasWidth;
      ctx.canvas.height = canvasHeight;
      ctx.beginPath();
      ctx.lineWidth = this.gridStrokeWidth
      for(let position:number = 0; position <= canvasWidth; position = position + this.gridScale){
        ctx.moveTo(position, 0);
        ctx.lineTo(position, canvasHeight);
      }
      for(let position:number = 0; position <= canvasHeight; position = position + this.gridScale){
        ctx.moveTo(0, position);
        ctx.lineTo(canvasWidth, position);
      }
      ctx.stroke();
      ctx.closePath();
    })
  }
  constructor(private boardSettingsService:BoardSettingsService) { }
}
