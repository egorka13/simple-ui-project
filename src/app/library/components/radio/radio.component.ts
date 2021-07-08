import { Component, Input, OnInit } from '@angular/core';
import { Radio } from './radio';

@Component({
    selector: 'sui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['../button/button.component.less',
                './radio.component.less']
})
export class RadioComponent implements OnInit {
    items: Radio[] = [];
    typeModifier: string = '';

    @Input()
    name: string = 'radio' + Math.random().toFixed(5);

    @Input()
    labels: string = 'Radio';

    @Input()
    type: undefined | 'button';

    constructor() { }

    ngOnInit(): void {
        const labelsArr = this.labels.split(' ');
        for (let i: number = 0; i < labelsArr.length; i++) {
            this.items.push({
                id: [this.name,  i].join('_'),
                text: labelsArr[i]
            })
        }

        this.typeModifier = this.type ? '_type_button' : '';
    }

}