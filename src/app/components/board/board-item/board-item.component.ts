import { componentModels, configPanelProperty } from './../../config-panel/config-panel.model';
import { Component } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ConfigDataService } from './../../../core/services/config-data.service';

@Component({
    selector: 'sui-board-item',
    templateUrl: './board-item.component.html',
    styleUrls: ['./board-item.component.less'],
})

export class BoardItemComponent {
    private suiComponent: any;
    private keyForSubject: number = Date.now();
    
    constructor(private ConfigDataService: ConfigDataService) { }

    // addComponent(): void {
    //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(InputComponent);
    //     let componentRef = this.place.createComponent(componentFactory);

    //     // this.suiComponent = componentRef.instance;
    // }
   
    handleClickBoardItem(event: Event): void {
        const suiElem: Element = <Element>(<Element>event.target).lastElementChild;
        const suiElemTagName: string = suiElem.tagName.toLowerCase();

        this.ConfigDataService.sendConfigData({
            key: this.keyForSubject,
            suiComponent: suiElemTagName,
            properties: componentModels[suiElemTagName].map(property => {
                property.value = this.suiComponent[property.name];
                return property;
            })
        });

        this.ConfigDataService.changedItemProperty
            .pipe(takeWhile(config => config.key == this.keyForSubject))
            .subscribe((config: {key: number, property: configPanelProperty}) => {
                this.suiComponent[config.property.name] = config.property.value;
            });
    }
}

