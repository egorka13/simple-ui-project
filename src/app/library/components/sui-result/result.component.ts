import { Component, OnInit, Input } from '@angular/core';
import { resultTypes, TypeResults } from './resultTypes';

@Component({
    selector: 'sui-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.less'],
})
export class ResultComponent implements OnInit {
    types: TypeResults = resultTypes;
    generalType: string = '';
    generalCurType: string = '';
    generalCurAlt: string = '';

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
        this.generalCurType = this.checkValidType(this.types[this.type]) ? this.type : '';
        this.generalCurAlt = this.checkValidType(this.types[this.type])
            ? `here ${this.type} image`
            : `${this.title} image`;
    }

    /**
     * method of checking for a non-standard input path to the picture.
     * @param data original input's data
     * @returns returns false if the value is undefined, true otherwise
     */
    checkValidType(data: string): boolean {
        return data !== undefined ? true : false;
    }
}
