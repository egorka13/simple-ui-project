import { ConfigDataService } from './../../core/services/config-data.service';
import { configPanelProperty } from './config-panel.model';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'sui-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrls: ['./config-panel.component.less'],
})

export class ConfigPanelComponent implements OnInit {
    private currentConfigItemKey: number;

    public suiComponentName: string;
    public isDesign: boolean = true;
    public properties: configPanelProperty[];

    constructor(private ConfigDataService: ConfigDataService) { }

    ngOnInit() {
        this.ConfigDataService.currentItemConfig.subscribe((config: {key: number, suiComponent: string, properties: configPanelProperty[]}) => {
            this.properties = config.properties;
            this.currentConfigItemKey = config.key;
            this.suiComponentName = config.suiComponent;
        });
    }

    handleHeaderClick(event: Event): void {
        const element: Element = <Element>event.target;
        this.isDesign = element.id == 'designSection';
        
        const parent: Element = <Element>element.parentElement;
        [].forEach.call(parent.children, (el: Element) => {
            el.classList.remove('_active');
        });
        element.classList.add('_active');
    }

    applyChanges(): void {
        // this.ConfigDataService.sendChangeConfigData(this.currentConfig);
    }

    resetChanges(): void {

    }

    onBlur(event: Event): void {
        const elem: Element = <Element>event.target;
        if (elem.tagName == 'INPUT' || elem.tagName == 'SELECT') {
            const propertyName: string = <string>(<Element>elem.previousElementSibling).textContent;
            console.log();
            const propertyValue: string | number = (<HTMLTextAreaElement>event.target).value;
            this.ConfigDataService.sendChangeConfigData({
                key: this.currentConfigItemKey,
                property: {name: propertyName, value: propertyValue}
            });
        }
    }
}
