import { Component, Input } from '@angular/core';
import { buttonSize, buttonType } from './button.model';

@Component({
    selector: 'sui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
    @Input()
    type: buttonType;

    @Input()
    size: buttonSize;

    @Input()
    isGhost: boolean = false;

    @Input()
    innerText: string = 'Button';

    get classes(): string {
        const typeModifier = this.type ? '_type_' + this.type : '';
        const sizeModifier = this.size ? '_size_' + this.size : '';
        return ['sui-button', typeModifier, sizeModifier, this.isGhost ? '_ghost' : ''].join(' ');
    }

    handleClick(event: Event): void {
        const element: Element = event.target as Element;
        const elemClasses = element.classList;
        if (elemClasses.contains('_type_text') || elemClasses.contains('_type_link')) {
            return;
        }
        element.classList.remove('_clicked');
        setTimeout(() => {
            element.classList.add('_clicked');
        }, 0);
    }
}
