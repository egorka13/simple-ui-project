import { Component, OnInit } from '@angular/core';
import { BoardSettingsService } from 'src/app/core/services/board-settings.service';

@Component({
    selector: 'sui-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {

    public scale:number;

    constructor(public boardSettingsService: BoardSettingsService){
    
    }

    ngOnInit():void{
        this.scale = this.boardSettingsService.scale * 100;
    }
}
