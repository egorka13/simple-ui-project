import { Component, Input, OnInit } from '@angular/core';
import { resultTypes } from './switch.model';

@Component({
    selector: 'sui-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.less'],
})
export class SwitchComponent implements OnInit {
    @Input()
    isDisabled: boolean = false;

    @Input()
    innerText?: Array<string>;

    @Input()
    useMarkers: boolean = false;

    public isChecked: boolean = false;
    public text: string;
    public markerPath: string = resultTypes.off;

    ngOnInit(): void {
        this.text = this.checkInnerText();
    }

    public onClick(): void {
        this.isChecked = !this.isChecked;
        if (this.innerText) {
            if (this.isChecked) {
                this.text = this.innerText[0];
            } else {
                this.text = this.innerText[1];
            }
        }
        if (this.useMarkers) {
            if (this.isChecked) {
                this.markerPath = resultTypes.on;
            } else {
                this.markerPath = resultTypes.off;
            }
        }
    }

    private checkInnerText(): string {
        if (this.innerText) {
            return this.innerText[1];
        }
        return '';
    }
}
