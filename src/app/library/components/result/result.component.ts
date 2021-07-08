import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { resultTypes, TypeResults } from './result.model';
import { ResultTitlesStyles } from './font.model';

@Component({
    selector: 'sui-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.less'],
})
export class ResultComponent implements OnInit, AfterViewInit {
    types: TypeResults = resultTypes;
    generalType: string = '';
    generalCurType: string = '';
    generalCurAlt: string = '';

    @ViewChild('generalBtn')
    generalBtnIdentifier: ElementRef;

    @ViewChild('additionalBtn')
    additionalBtnIdentifier: ElementRef;

    @ViewChild('resultTitle')
    resultTitle: ElementRef;

    @ViewChild('resultSubTitle')
    resultSubTitle: ElementRef;

    //An input parameter responsible for setting the component headers
    /**
     * @param first - Responsible for title text
     * @param second - Responsible for title font-family style
     * @param third - Responsible for title font-color style
     * @param fourth - Responsible for title font-size style (e.g 24px or .5em or other)
     */
    @Input()
    title: string[] = ["Here's sample title", '', '', ''];

    /**
     * @see title
     */
    @Input()
    subtitle?: string[];

    @Input()
    type: string = 'success';

    //Input parameter responsible for the styles of the main button (by default, an empty link, `go back` text, and standard library styles are set)
    /**
     * @param first - Responsible for link text  (e.g ['https://angular.io', 'go back'])
     * @param second - Responsible for button text (e.g 'Angular')
     * @param third - Responsible for button background color (e.g 'black')
     * @param fourth - Responsible for button border color (e.g 'black')
     * @param fifth - Responsible for button text color (e.g 'black')
     */
    @Input()
    hrefGeneral: string[] = ['', 'Go back', '', '', ''];

    @Input()
    hrefAdditional?: string[];

    constructor() {}

    ngOnInit(): void {
        //Checking the input parameters of a component
        this.initInputTypesCheck();
    }

    ngAfterViewInit(): void {
        //Required Styles on Buttons
        this.setButtonStyles(this.hrefGeneral, this.generalBtnIdentifier);
        this.setButtonStyles(this.hrefAdditional, this.additionalBtnIdentifier);
    }

    /**
     * A method that checks all input type (@see resultTypes). Sets values according to input parameters
     */
    initInputTypesCheck(): void {
        this.generalType = this.types[this.type] || this.type;
        this.generalCurType = this.checkValidType(this.types[this.type]) ? `_${this.type}` : '';
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

    /**
     * The method responsible for changing the button styles (background, border color, text color)
     * @param data original array with values  (@see hrefGeneral) or (@see hrefAdditional)
     * @param element original button element  (@see generalBtnIdentifier) or (@see additionalBtnIdentifier)
     */
    setButtonStyles(data?: string[], element?: ElementRef): void {
        if (element && data) {
            if (data[2] !== '' && data[2] !== undefined) {
                element.nativeElement.style.background = data[2];
            }
            if (data[3] !== '' && data[3] !== undefined) {
                element.nativeElement.style.borderColor = data[3];
            }
            if (data[4] !== '' && data[4] !== undefined) {
                element.nativeElement.childNodes[0].style.color = data[4];
            }
        }
    }

    /**
     * The method responsible for converting the header styles of the component
     * @param data - original input  @see title
     * @returns styles object for the heading if the input parameter exists
     */
    setFontStyles(data?: string[]): ResultTitlesStyles {
        if (data) {
            const fontFamily:string = data[1];
            const fontColor:string = data[2];
            const fontSize:string = data[3];
            let result: ResultTitlesStyles = {};
            if (fontFamily) {
                result['font-family'] = fontFamily;
            }
            if (fontColor) {
                result['color'] = fontColor;
            }
            if (fontSize) {
                result['font-size'] = fontSize;
            }
            return result;
        }
        return {};
    }
}
