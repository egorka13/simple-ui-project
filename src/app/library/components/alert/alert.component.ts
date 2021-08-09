import { Component, Input } from '@angular/core';
import { alertType } from './alert.model';

@Component({
    selector: 'sui-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.less'],
})
export class AlertComponent {
    public assetsPath: string = 'app/library/assets/icons/alert/';

    @Input()
    public type: alertType = 'success';

    @Input()
    public message: string = 'Success text';

    @Input()
    public description: string = '';

    @Input()
    public icon: boolean = false;
}
