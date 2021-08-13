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
    private checkedText: string = '';
    private uncheckedText: string = '';
    public isChecked: boolean = false;
    public isDisabled: boolean = false;
    /**
     * An input parameter that sets the text in the checked state
     */
    @Input()
    set setCheckedText(value: string) {
        if (this.isChecked) {
            this._text = value;
        }
        this.checkedText = value;
    }

    /**
     * An input parameter that sets the text in the unchecked state
     */
    @Input()
    set setUnCheckedText(value: string) {
        if (!this.isChecked) {
            this._text = value;
        }
        this.uncheckedText = value;
    }

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
    set setChecked(value: boolean) {
        this.isChecked = value;
        if (this.isChecked) {
            this._text = this.checkedText;
        } else {
            this._text = this.uncheckedText;
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

    /**
     * The parameter responsible for the disable state of the component.
     */
    @Input()
    set setDisabled(value: boolean) {
        this.isDisabled = value;
    }
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
     * This method is triggered in case of clicking on the component
     */
    public onClick(): void {
        this.isChecked = !this.isChecked;
        this.switchStatus.emit(this.isChecked);

        if (this.isChecked) {
            this._text = this.checkedText;
        } else {
            this._text = this.uncheckedText;
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
        if (this.useMarkers) {
            if (this.isChecked) {
                this._markerPath = resultTypes.on;
            }
        }
    }
}
