import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { configPanelProperty } from 'src/app/components/config-panel/config-panel.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigDataService {
    constructor() { }

    public currentItemConfig = new Subject<{
        suiComponent: string,
        properties: configPanelProperty
    }>();
    
    public changedItemProperty = new Subject<configPanelProperty>();

    sendConfigData (configData: {suiComponent: string, properties: configPanelProperty}): void {
        this.currentItemConfig.next(configData);
    }

    sendChangeConfigData (configData: configPanelProperty): void {
        this.changedItemProperty.next(configData);
    }
}
