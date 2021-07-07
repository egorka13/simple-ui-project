import { Component, Input } from '@angular/core';
import { SizeModifierType } from './input.model';

@Component({
    selector: 'sui-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.less'],
})
export class InputComponent {
    @Input()
    placeholder: string = 'input text';

    @Input()
    sizeModifier: SizeModifierType = '';
}
