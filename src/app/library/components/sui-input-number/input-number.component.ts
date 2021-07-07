import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'sui-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.less'],
})
export class InputNumberComponent implements OnInit {
    @Output() valueChange = new EventEmitter();
    @Input() value: any = null;
    @Input() min: number = 1;
    @Input() max: number = 99;

    @ViewChild('inputNumber')
    inputElement: any;

    constructor() {}

    ngOnInit(): void {}

    change(): void {
        if (this.value) {
            if (isNaN(this.inputElement.nativeElement.value)) {
                this.value = 1;
                console.log(typeof this.inputElement.nativeElement.value);

                this.valueChange.emit(this.value);
                return;
            }
        }
        if (this.max) {
            if (this.value > this.max) {
                this.value = this.max;
                this.valueChange.emit(this.value);
                return;
            }
        }
        if (this.min) {
            if (this.value < this.min && this.value !== '') {
                this.value = this.min;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.value = this.inputElement.nativeElement.value;
        this.valueChange.emit(this.value);
    }

    onIncrement(): void {
        ++this.value;
        if (this.max) {
            if (this.value > this.max) {
                this.value = this.max;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.valueChange.emit(this.value);
    }

    onDecrement(): void {
        --this.value;
        if (this.min) {
            if (this.value < this.min) {
                this.value = this.min;
                this.valueChange.emit(this.value);
                return;
            }
        }
        this.valueChange.emit(this.value);
    }
}
