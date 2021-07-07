import { buttonType } from './buttonTypes';
import { Component, Input, OnInit } from '@angular/core';
import { buttonSize } from './buttonSizes';

@Component({
    selector: 'sui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
    @Input()
    type: buttonType;

    @Input()
    size: buttonSize;

    @Input()
    isGhost: boolean = false;

    @Input() 
    innerText: string = 'Button';

    classes: string = 'button';
    
    constructor() {
    }

    ngOnInit(): void {
        const typeModifier = this.type ? '_type_' + this.type : '';
        const sizeModifier = this.size ? '_size_' + this.size : '';
        this.classes = [this.classes, typeModifier, sizeModifier, 
            this.isGhost ? '_ghost' : ''].join(' ');
        console.log(this.isGhost);
    }

    getClasses(): string {
        return this.classes;
    }

    handleClick(event: Event): void {
        const element: Element = <Element>event.target;
        const elemClasses = element.classList;
        if (elemClasses.contains('_type_text') ||
            elemClasses.contains('_type_link')) {
            return;
        }
        element.classList.remove('_clicked');
        setTimeout(() => {
            element.classList.add('_clicked');
        }, 0);
    }
}