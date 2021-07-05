import { Component, Input, OnInit } from '@angular/core';
import { Radio } from './radio';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['../button/button.component.less',
                './radio.component.less']
})
export class RadioComponent implements OnInit {
    items: Radio[] = [];
    titlesArr: string[] = [];
    typeModifier: string = '';

    @Input()
    name: string = 'radio' + Math.random().toFixed(5);

    @Input()
    titles: string = 'Radio';

    @Input()
    type: undefined | 'button';

    constructor() { }

    ngOnInit(): void {
        this.titlesArr = this.titles.split(' ');
        for (let i: number = 0; i < this.titlesArr.length; i++) {
            this.items.push({
                id: this.name + i,
                text: this.titlesArr[i]
            })
        }

        this.typeModifier = this.type ? '_type_button' : '';
    }

}
