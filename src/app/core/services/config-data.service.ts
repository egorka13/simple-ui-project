import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ILibComponentConfig, IConfigPanelProperty } from '@models/config-panel.model';

@Injectable({
    providedIn: 'root',
})
export class ConfigDataService {
    public setConfigData$ = new Subject<ILibComponentConfig | null>();

    public saveConfigData$ = new Subject<IConfigPanelProperty>();

    public setConfigData(configData: ILibComponentConfig | null): void {
        this.setConfigData$.next(configData);
    }

    public saveConfigData(properties: IConfigPanelProperty): void {
        this.saveConfigData$.next(properties);
    }
}
