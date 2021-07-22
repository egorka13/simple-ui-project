import { Component, OnInit } from '@angular/core';
import { BoardSettingsService } from 'src/app/core/services/board-settings.service';
import { GridSettingsService } from 'src/app/core/services/grid-settings.service';

@Component({
    selector: 'sui-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit{

    public gridState:boolean = this.gridSettingsService.gridStatus;

    public getGridPath():string{
        return this.gridState ? "../../../assets/icons/header/header-grid-btn.svg" : "../../../assets/icons/header/header-grid-none.svg";
    }


    public onClickSetGridState(){
        this.gridState = !this.gridState;
        this.gridSettingsService.setGridStatus(this.gridState);
    }

    public getRounderScale():number{
        return Math.round(this.boardSettingsService.scale * 100);
    }

    constructor(public boardSettingsService: BoardSettingsService, public gridSettingsService: GridSettingsService){}
    ngOnInit():void{
    }


    private checkValidValue(value:number):number{
        if(value > 2){
            return 2;
        }
        if(value < .3){
            return .3;
        }
        return value;
    }

    onChangeInput(event: Event):void{
        const targetInput: HTMLInputElement = <HTMLInputElement>event.target;
        let currentValue:number = Number(targetInput.value) / 100;
        this.boardSettingsService.setScale(this.checkValidValue(currentValue));
    }

    onClickInput(event: Event):void{
        const targetInput: HTMLInputElement = <HTMLInputElement>event.target;
        targetInput.value = "";
    }

    onKeyUpInput(event: Event):void{
        const targetInput: HTMLInputElement = <HTMLInputElement>event.target;
        targetInput.value = targetInput.value.replace(/[^0-9%]/gi, '');
    }

    onClickZoomIn():void{
        this.boardSettingsService.changeScale(1);
    }

    onClickZoomOut():void{
        this.boardSettingsService.changeScale(-1);
    }
}