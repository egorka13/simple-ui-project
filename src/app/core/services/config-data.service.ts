import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { configPanelProperty } from 'src/app/components/config-panel/config-panel.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigDataService {
    constructor() { }

    public currentItemConfig = new Subject<{
        key: number,
        suiComponent: string,
        properties: configPanelProperty[]
    }>();
    
    public changedItemProperty = new Subject<{
        key: number,
        property: configPanelProperty
    }>();

    sendConfigData (configData: {key: number, suiComponent: string, properties: configPanelProperty[]}): void {
        this.currentItemConfig.next(configData);
    }

    sendChangeConfigData (configData: {key: number, property: configPanelProperty}): void {
        this.changedItemProperty.next(configData);
    }
}
