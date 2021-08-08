import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { resultTypes, TypeSwitch } from './switch.model';

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
     * An input parameter that sets the text in the checked state
     */
    @Input()
    checkedText: string = '';

    /**
     * An input parameter that sets the text in the unchecked state
     */
    @Input()
    unCheckedText?: string;

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
     * The parameter responsible for the active state of the component.
     */
    @Input()
    isChecked: boolean = false;

    /**
     * The parameter responsible for the disable state of the component.
     */
    @Input()
    isDisabled: boolean = false;
    /**
     * Parameter responsible for the internal text of the component
     */
    public _text: string = '';

    public _svgPaths: TypeSwitch = resultTypes;

    /**
     * @see SwitchComponent.useMarkers
     * The current parameter is required to set the path to the checkmark and cross icons, respectively
     */
    public _markerPath: string = resultTypes.off;

    ngOnInit(): void {
        this.init();
    }

    /**
     * Sets the required value of inner text
     * @param value Required value for installation
     */
    set setText(value: string) {
        this._text = value;
    }

    /**
     * This method is triggered in case of clicking on the component
     */
    public onClick(): void {
        this.isChecked = !this.isChecked;
        this.switchStatus.emit(this.isChecked);

        if (this.isChecked) {
            this.setText = this.checkedText;
        } else {
            if (this.unCheckedText) {
                this.setText = this.unCheckedText;
            }
        }
        //If the markers parameter exists
        if (this.useMarkers) {
            //If component is checked we change marker's paths
            if (this.isChecked) {
                this._markerPath = resultTypes.on;
            } else {
                this._markerPath = resultTypes.off;
            }
        }
    }

    private init() {
        if (this.isChecked) {
            this.setText = this.checkedText;
        } else {
            if (this.unCheckedText) {
                this.setText = this.unCheckedText;
            }
        }
        if (this.useMarkers) {
            if (this.isChecked) {
                this._markerPath = resultTypes.on;
            }
        }
    }
}
