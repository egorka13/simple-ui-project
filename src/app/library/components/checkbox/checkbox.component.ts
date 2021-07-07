import { Component, Input } from '@angular/core';

@Component({
    selector: 'sui-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.less'],
})
export class CheckboxComponent {
    @Input()
    labelText: string = 'Chechbox';

    @Input()
    isDisabled: boolean = false;

    @Input()
    isChecked: boolean = false;
}
