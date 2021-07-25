import { Component, Input, OnInit } from '@angular/core';
import { RadioItem, radioType } from './radio.model';

@Component({
    selector: 'sui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less'],
})
export class RadioComponent implements OnInit {
    items: RadioItem[] = [];
    typeModifier: string = '';

    @Input()
    name: string = 'radio' + Date.now().toFixed(6);

    @Input()
    label: string[] = ['Radio'];

    @Input()
    set type(value: radioType) {
        this.typeModifier =  value ? '_type_' + value : '';
    }

    ngOnInit(): void {
        for (let i: number = 0; i < this.label.length; i++) {
            this.items.push({
                id: [this.name, i].join('_'),
                text: this.label[i],
            });
        }
    }
}
