import { Component, Input } from '@angular/core';
import { SizeModifierType } from './input.model';

@Component({
    selector: 'sui-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.less'],
})
export class InputComponent {
    public _sizeModifier: string = '';

    @Input()
    placeholder: string = 'input text';

    @Input()
    set size(value: SizeModifierType) {
        this._sizeModifier = `_size_${value}` || '';
    }
}
