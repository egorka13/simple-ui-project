import { Component, OnInit, Input } from '@angular/core';
import { resultTypes, TypeResults } from './resultTypes';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.less'],
})
export class ResultComponent implements OnInit {
    types: TypeResults = resultTypes;
    generalType: string = '';

    @Input()
    title: string = "Here's sample title";

    @Input()
    subtitle?: string;

    @Input()
    type: string = 'success';

    @Input()
    hrefGeneral: string[] = ['', 'Go back'];

    @Input()
    hrefAdditional?: string[];

    constructor() {}

    ngOnInit(): void {
        this.generalType = this.types[this.type] || this.type;
    }
}
