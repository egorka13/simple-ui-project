import { Component, Input } from '@angular/core';
import { SizeType } from './inputAntTypes';

@Component({
    selector: 'app-input-ant',
    templateUrl: './input-ant.component.html',
    styleUrls: ['./input-ant.component.less'],
})
export class InputAntComponent {
    @Input()
    placeholder: string = 'input text';

    @Input()
    sizeModificator: SizeType = '';
}
