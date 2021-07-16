import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SizeModifierType } from './card.model';

@Component({
    selector: 'sui-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
    @Input()
    size: SizeModifierType = '';

    @Input()
    title: string = 'Card';

    @Input()
    text: string = 'Card content';

    @Input()
    contentTemplate: TemplateRef<any>;

    sizeModifier: string = '';

    ngOnInit(): void {
        this.sizeModifier = this.size ? `_size_${this.size}` : '';
    }
}
