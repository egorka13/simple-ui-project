import { Component, Input, OnInit } from '@angular/core';
import { SizeModifierType } from './input.model';

@Component({
    selector: 'sui-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.less'],
})
export class InputComponent implements OnInit {
    @Input()
    placeholder: string = 'input text';

    @Input()
    size: SizeModifierType = '';

    sizeModifier: string = '';

    ngOnInit() {
        this.sizeModifier = this.size ? `_size_${this.size}` : '';
    }
}
