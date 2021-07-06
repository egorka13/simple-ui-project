import { Component, Input } from '@angular/core';
import { SizeModifierType } from './input-ant.model';

@Component({
    selector: 'sui-input-ant',
    templateUrl: './input-ant.component.html',
    styleUrls: ['./input-ant.component.less'],
})
export class InputAntComponent {
    @Input()
    placeholder: string = 'input text';

    @Input()
    sizeModifier: SizeModifierType = '';
}
