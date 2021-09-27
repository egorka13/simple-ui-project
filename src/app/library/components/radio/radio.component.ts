import { Component, Input } from '@angular/core';
import { radioType, radioView, radioSize } from './radio.model';

@Component({
    selector: 'sui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less'],
})
export class RadioComponent {
    typeModifier: string = '';
    viewModifier: string = '';
    sizeModifier: string = '';
    name: string = 'radio' + Date.now().toString();

    @Input()
    label: string[] = ['radio'];

    @Input()
    set type(value: radioType) {
        this.typeModifier = '_type_' + value;
    }

    @Input()
    set view(value: radioView) {
        this.viewModifier = '_view_' + value;
    }

    @Input()
    set size(value: radioSize) {
        this.sizeModifier = '_size_' + value;
    }
}
