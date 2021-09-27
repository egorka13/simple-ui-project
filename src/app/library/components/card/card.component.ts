import { Component, Input, TemplateRef } from '@angular/core';
import { SizeModifierType } from './card.model';

@Component({
    selector: 'sui-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less'],
})
export class CardComponent {
    sizeModifier: string = '';

    @Input()
    set size(value: SizeModifierType) {
        this.sizeModifier = `_size_${value}` || '';
    }

    @Input()
    title: string = 'Card';

    @Input()
    text: string = 'Card content';

    @Input()
    contentTemplate: TemplateRef<any>;
}
