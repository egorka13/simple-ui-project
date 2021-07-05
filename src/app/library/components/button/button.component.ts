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
    innerText: string = 'Button';

    typeModifier: string = '';
    sizeModifier: string = '';
    isBlock: boolean = false;
    
    constructor() {
    }

    ngOnInit(): void {
        this.typeModifier = this.type ? '_type_' + this.type : '';
        this.sizeModifier = this.size ? '_size_' + this.size : '';
    }

    handleClick(event: Event): void {
        const element: Element = <Element>event.target;
        element.classList.add('_clicked');
    }

    handleAnimationEnd(event: Event): void {
        const element: Element = <Element>event.target;
        element.classList.remove('_clicked');
    }
}
