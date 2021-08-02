import { Component, Input } from '@angular/core';
import { RadioItem, radioType } from './radio.model';

@Component({
    selector: 'sui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less'],
})
export class RadioComponent {
    items: RadioItem[] = [];
    typeModifier: string = '';
    name: string = 'radio' + Date.now().toFixed(6);

    @Input()
    label: string[] = ['Radio'];

    @Input()
    set type(value: radioType) {
        this.typeModifier = value ? '_type_' + value : '';
    }
}
