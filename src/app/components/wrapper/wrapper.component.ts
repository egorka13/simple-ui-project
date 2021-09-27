import { Component } from '@angular/core';

@Component({
    selector: 'sui-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.less'],
})
export class WrapperComponent {
    public isHiddenConfigPanel: boolean = true;

    public changeConfigPanelView(isHidden: boolean): void {
        this.isHiddenConfigPanel = isHidden;
    }
}
