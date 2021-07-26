import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IDataComponent } from '../../models/panel.model';
import { IGroupItems } from '../../models/panel.model';
import { BoardConverseService } from '@services/board-converse.service';

import { InputComponent } from '@library-components/input/input.component';
import { InputNumberComponent } from '@library-components/input-number/input-number.component';
import { CheckboxComponent } from '@library-components/checkbox/checkbox.component';
import { CardComponent } from '@library-components/card/card.component';
import { ButtonComponent } from '@library-components/button/button.component';
import { ResultComponent } from '@library-components/result/result.component';
import { RadioComponent } from '@library-components/radio/radio.component';
import { SliderComponent } from '@library-components/slider/slider.component';

@Component({
    selector: 'sui-component-panel',
    templateUrl: './component-panel.component.html',
    styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent {
    groupItems: IGroupItems[] = [{ group: 'Base' }, { group: 'Logical' }, { group: 'Multimedia' }];

    dataComponents: IDataComponent[] = [
        {
            group: 'Multimedia',
            nameComponent: 'Card',
            svgUrl: '/assets/icons/panel/card-icon.svg',
            component: CardComponent,
        },
        {
            group: 'Multimedia',
            nameComponent: 'Result',
            svgUrl: '/assets/icons/panel/result-icon.svg',
            component: ResultComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Button',
            svgUrl: '/assets/icons/panel/button-icon.svg',
            component: ButtonComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Checkbox',
            svgUrl: '/assets/icons/panel/checkbox-icon.svg',
            component: CheckboxComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Radio',
            svgUrl: '/assets/icons/panel/radio-icon.svg',
            component: RadioComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Slider',
            svgUrl: '/assets/icons/panel/slider-icon.svg',
            component: SliderComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Input',
            svgUrl: '/assets/icons/panel/input-icon.svg',
            component: InputComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Input Number',
            svgUrl: '/assets/icons/panel/input-number-icon.svg',
            component: InputNumberComponent,
        },
    ];

    @Input()
    value: string;

    constructor(public boardConverseService: BoardConverseService) {}

    public _addComponent(component: any): void {
        this.boardConverseService.addLibraryComponent(component, {});
    }
}
