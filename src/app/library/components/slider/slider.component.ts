import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sui-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.less'],
})
export class SliderComponent implements OnInit {
    /**
     * the property responsible for toggling the state of the marker indicating the current value of the slider
     * @see SliderComponent.onMouseDown
     * @see SliderComponent.onMouseUp
     * @see SliderComponent.onMouseOver
     * @see SliderComponent.onMouseOut
     */
    public showMarker: boolean = true;

    /**
     * This property responsible for disabled state of slider
     */
    @Input()
    disabled: boolean | string = false;

    /**
     * This property responsible for showing minimal value
     */
    @Input()
    showMinimalValue?: boolean = false;

    /**
     * This property responsible for showing maximum value
     */
    @Input()
    showMaximumValue?: boolean = false;

    /**
     * The current input parameter sets the legend
     */
    @Input()
    legend?: string = '';

    /**
     * The current input parameter sets the legend color
     */
    @Input()
    legendColor?: string = '';

    /**
     * The current input parameter sets the slider color
     */
    @Input()
    sliderColor?: string = '';

    /**
     * The current input parameter sets the values color
     */
    @Input()
    valuesColor?: string = '';

    /**
     * The current input parameter sets the slider width
     */
    @Input()
    wrapperWidth?: string = '500px';

    /**
     * The current input parameter sets maximum slider value
     */
    @Input()
    maxValue?: number = 100;

    /**
     * The current input parameter sets minimum slider value
     */
    @Input()
    minValue?: number = 0;

    /**
     * The current input parameter sets current slider value
     */
    @Input()
    currentValue?: number = 0;

    /**
     * The current input parameter sets current slider step value
     */
    @Input()
    step?: number = 1;

    @ViewChild('suiSlider')
    suiSlider: ElementRef;

    @ViewChild('suiProgressBar')
    suiProgressBar: ElementRef;

    @ViewChild('marker')
    marker: ElementRef;

    @Output()
    sliderValue: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Sets the forwarding of the current parameter to the parent component. You can use this in conjunction with the input component of the sui library
     */
    public onChange(): void {
        this.sliderValue.emit(this.currentValue);
    }

    /**
     * @see SliderComponent.showMarker
     * Toggles the field value to false state at the moment the mouse cursor clicks (keydown) on the field
     */
    public onMouseDown(): void {
        this.showMarker = false;
    }

    /**
     * @see SliderComponent.showMarker
     * Toggles the field value to true state at the moment the mouse cursor clicks (keyup) on the field
     */
    public onMouseUp(): void {
        this.showMarker = true;
    }

    /**
     * @see SliderComponent.showMarker
     * Toggles the field value to false when the mouse hovers over the field
     */
    public onMouseOver(): void {
        this.showMarker = false;
    }

    /**
     * @see SliderComponent.showMarker
     * Toggles the field value to true when the mouse hovers out the field
     */
    public onMouseOut(): void {
        this.showMarker = true;
    }

    ngOnInit(): void {
        this.checkValidParams();
    }

    /**
     * @see SliderComponent.getCurrentProgressWidth
     * The method responsible for changing the progress bar width. According to the width of the stripe,
     * the scrolling acceleration is calculated as the ratio "width-current value".
     * In this case, the mixing with respect to the initial value of the slider is also taken into account.
     * @returns returns the required width of the progress block in pixels
     */
    public getCurrentMarkerOffset(): string {
        let deltaX: number = 15;
        if (this.currentValue !== undefined && this.maxValue !== undefined && this.minValue !== undefined) {
            const progressPercent: number =
                (Math.abs(this.minValue - this.currentValue) * 100) / (this.maxValue - this.minValue);
            //These values are responsible for the displacement of the marker with the current value relative to the slider.
            //All values are calculated experimentally and have no final calculation!
            //Change this if you need
            if (progressPercent >= 85) {
                deltaX = 25;
            }
            if (progressPercent > 20 && progressPercent <= 40) {
                deltaX = 16;
            }
            if (progressPercent > 5 && progressPercent <= 20) {
                deltaX = 13;
            }

            if (progressPercent <= 5) {
                deltaX = 8;
            }

            if (progressPercent <= 2) {
                deltaX = 2;
            }
            return `${
                Number(this.getCurrentProgressWidth().substring(0, this.getCurrentProgressWidth().length - 2)) - deltaX
            }px`;
        }
        return '0px';
    }

    /**
     * @see SliderComponent.getCurrentMarkerOffset
     * Calculates the width of the progress box using the "width-current ratio".
     * Is performed without considering the offset of the marker of the current value
     * @returns
     */
    public getCurrentProgressWidth(): string {
        if (this.minValue !== undefined && this.maxValue !== undefined && this.currentValue !== undefined) {
            return `${
                (Math.abs(this.minValue - this.currentValue) *
                    Number(this.wrapperWidth?.substring(0, this.wrapperWidth.length - 2))) /
                (this.maxValue - this.minValue)
            }px`;
        }
        return '0px';
    }

    /**
     * A method that checks (validates) the input parameters. Displays an error if parameters were passed incorrectly
     */
    public checkValidParams(): void {
        if (this.minValue !== undefined && this.maxValue !== undefined && this.currentValue !== undefined) {
            if (this.minValue > this.maxValue) {
                this.minValue = 0;
                this.maxValue = 100;
                throw new Error('SUI-ERROR: Minimal value cannot be greater then maximum!');
            }
            if (this.currentValue > this.maxValue || this.minValue > this.currentValue) {
                this.currentValue = this.minValue;
                throw new Error('SUI-ERROR: Current value cannot be greater then maximum and less then minimum!');
            }
        }
    }

    /**
     * Sets the specified css value
     * @param type the original css property to be assigned a value
     * @param value the required value for the property
     * @returns Returns a css property object
     */
    public setCustomProperty(type: string, value?: string): Record<string, string> {
        if (value !== undefined) {
            return {
                [type]: value,
            };
        }
        return {};
    }
}
