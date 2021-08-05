import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { resultTypes } from './switch.model';

@Component({
    selector: 'sui-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.less'],
})
/**
 * @class Simple UI switch component
 */
export class SwitchComponent implements OnInit {
    /**
     * IAn input parameter responsible for putting the component in an inactive state.
     * Disabled by default
     */
    @Input()
    isDisabled: boolean = false;

    /**
     * The text inside the component. The first parameter is the text in the active state
     * of the component, the second is for the disabled state.
     */
    @Input()
    innerText?: Array<string>;

    /**
     * This input parameter automatically switches the state
     * of the component to inactive, with a rotating vector inside the field slider.
     */
    @Input()
    isLoading: boolean = false;

    /**
     * @see SwitchComponent.innerText
     * Analogue of the input parameter responsible for the text. However,
     * instead of or together with the text, it inserts images of a check mark
     * and a cross in the corresponding states.
     */
    @Input()
    useMarkers: boolean = false;

    /**
     * Required parameter for tracking the activity state of a component externally
     */
    @Output()
    switchStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * The parameter responsible for the active state of the component. By default - the component is not in the pressed state
     */
    public isChecked: boolean = false;
    /**
     * Parameter responsible for the internal text of the component
     */
    public text: string;
    /**
     * @see SwitchComponent.useMarkers
     * The current parameter is required to set the path to the checkmark and cross icons, respectively
     */
    public markerPath: string = resultTypes.off;

    ngOnInit(): void {
        this.text = this.checkInnerText();
    }

    /**
     * This method is triggered in case of clicking on the component
     */
    public onClick(): void {
        this.isChecked = !this.isChecked;
        this.switchStatus.emit(this.isChecked);
        //If the inner text parameter exists
        if (this.innerText) {
            //If component is checked we insert new text
            if (this.isChecked) {
                this.text = this.innerText[0];
            } else {
                this.text = this.innerText[1];
            }
        }
        //If the markers parameter exists
        if (this.useMarkers) {
            //If component is checked we change marker's paths
            if (this.isChecked) {
                this.markerPath = resultTypes.on;
            } else {
                this.markerPath = resultTypes.off;
            }
        }
    }

    /**
     * The method checks for the presence of the internal text of the component
     * @returns an empty string if no inner text parameters were found
     */
    private checkInnerText(): string {
        if (this.innerText) {
            return this.innerText[1];
        }
        return '';
    }
}
