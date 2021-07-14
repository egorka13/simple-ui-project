import { configPanelModel, configPanelProperty } from './config-panel.model';
import { Component } from '@angular/core';

@Component({
    selector: 'sui-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrls: ['./config-panel.component.less'],
})

export class ConfigPanelComponent {
    properties: configPanelProperty[] = configPanelModel;
    isDesign: boolean = true;

    handleHeaderClick(event: Event): void {
        const element: Element = <Element>event.target;
        this.isDesign = element.id == 'designSection';
        
        const parent: Element = <Element>element.parentElement;
        [].forEach.call(parent.children, (el: Element) => {
            el.classList.remove('_active');
        });
        element.classList.add('_active');
    }
}
