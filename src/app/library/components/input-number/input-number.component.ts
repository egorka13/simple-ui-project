import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { SizeModifierType } from './input-number.model';

@Component({
    selector: 'sui-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.less'],
})
export class InputNumberComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    valueToNumber: number;
    sizeModifier: string = '';

    @ViewChild('inputNumber')
    inputElement: ElementRef;

    @Input() value: string = '';
    @Input() min: string;
    @Input() max: string;
    @Input()
    set size(value: SizeModifierType) {
        this.sizeModifier = `_size_${value}` || '';
    }

    onChange(): void {
        this.valueToNumber = +this.value;
        if (this.value) {
            if (isNaN(this.inputElement.nativeElement.value)) {
                this.value = '1';
                this.valueChange.emit(this.value);
                return;
            }
        }
        if (this.max) {
            if (+this.value > +this.max) {
                this.value = this.max;
                this.valueChange.emit(this.value);
                return;
            }
        }
        if (this.min) {
            if (+this.value < +this.min && this.value !== '') {
                this.value = this.min;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.value = this.inputElement.nativeElement.value;
        this.valueChange.emit(this.value);
    }

    onIncrement(): void {
        this.valueToNumber = +this.value;
        if (this.value === '') {
            this.valueToNumber = 1;
        }
        ++this.valueToNumber;
        this.value = String(this.valueToNumber);
        if (this.max) {
            if (+this.value > +this.max) {
                this.value = this.max;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.valueChange.emit(this.value);
    }

    onDecrement(): void {
        this.valueToNumber = +this.value;
        if (this.value === '') {
            this.valueToNumber = 1;
        }
        --this.valueToNumber;
        this.value = String(this.valueToNumber);
        if (this.min) {
            if (+this.value < +this.min) {
                this.value = this.min;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.valueChange.emit(this.value);
    }
}
