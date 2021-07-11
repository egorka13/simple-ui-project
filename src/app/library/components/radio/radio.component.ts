import { Component, Input, OnInit } from '@angular/core';
import { RadioItem } from './radio.model';

@Component({
    selector: 'sui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less']
})
export class RadioComponent implements OnInit {
    items: RadioItem[] = [];
    typeModifier: string = '';

    @Input()
    name: string = 'radio' + Math.random().toFixed(5);

    @Input()
    labels: string = 'Radio';

    @Input()
    type: undefined | 'button';

    constructor() { }

    ngOnInit(): void {
        const labelsArr: string[] = this.labels.split(' ');
        for (let i: number = 0; i < labelsArr.length; i++) {
            this.items.push({
                id: [this.name,  i].join('_'),
                text: labelsArr[i]
            })
        }

        this.typeModifier = this.type ? '_type_button' : '';
    }

}
