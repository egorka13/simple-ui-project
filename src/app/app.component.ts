import { Component } from '@angular/core';

@Component({
    selector: 'sui-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    defaultValue:number = 0;

    maxValue:number = 100;
    minValue:number = 0;
    currentValue:number = 1;
    wrapperWidth:string="100px"

    counterValueChanged(event: number): void {
        this.defaultValue = event;
    }
}
