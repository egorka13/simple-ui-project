import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { IDataComponent } from './panel.model';
import { IGroupItems } from './panel.model';

@Component({
    selector: 'sui-component-panel',
    templateUrl: './component-panel.component.html',
    styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent {
    groupItems: IGroupItems[] = [{ group: 'Base' }, { group: 'Logical' }, { group: 'Multimedia' }];

    dataComponents: IDataComponent[] = [
        { group: 'Multimedia', nameComponent: 'Card', svgUrl: '/assets/icons/panel/card-icon.svg' },
        { group: 'Multimedia', nameComponent: 'Result', svgUrl: '/assets/icons/panel/result-icon.svg' },
        { group: 'Base', nameComponent: 'Button', svgUrl: '/assets/icons/panel/button-icon.svg' },
        { group: 'Logical', nameComponent: 'Checkbox', svgUrl: '/assets/icons/panel/checkbox-icon.svg' },
        { group: 'Logical', nameComponent: 'Radio', svgUrl: '/assets/icons/panel/radio-icon.svg' },
        { group: 'Logical', nameComponent: 'Slider', svgUrl: '/assets/icons/panel/slider-icon.svg' },
        { group: 'Base', nameComponent: 'Input', svgUrl: '/assets/icons/panel/input-icon.svg' },
        { group: 'Base', nameComponent: 'Input Number', svgUrl: '/assets/icons/panel/input-number-icon.svg' },
    ];

    @ViewChild('inputSearch')
    inputSearch: ElementRef;

    @ViewChild('inputSearch')
    componentItem: ElementRef;

    @Input()
    value: string;
}
