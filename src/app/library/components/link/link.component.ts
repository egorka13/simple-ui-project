import { Component, Input } from '@angular/core';

@Component({
    selector: 'sui-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.less'],
})
export class LinkComponent {
    colorValue: string;
    fontSizeValue: string;

    @Input()
    text: string = 'Link';

    @Input()
    href: string;

    @Input()
    color: string = 'hsl(0, 0%, 0%)';

    @Input()
    colorHover: string = 'hsl(0, 0%, 50%)';

    @Input()
    set fontSize(value: string) {
        this.fontSizeValue = `${value}px`;
    }

    onMouseEnter(): string {
        this.colorValue = this.color;
        this.color = this.colorHover;
        return this.color;
    }

    onMouseLeave(): string {
        this.color = this.colorValue;
        return this.color;
    }
}
