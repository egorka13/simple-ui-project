import { Component, OnInit, Input } from '@angular/core';
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

    sizeModifier: string = '';

    ngOnInit() {
        this.sizeModifier = this.size ? `_${this.size}` : '';
    }
}
