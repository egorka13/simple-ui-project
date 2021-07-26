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

        this.fooSize(); // TODO: delete this. Just for showcase.
        this.fooPlaceholder(); // TODO: delete this. Just for showcase.

        console.log('ILibComponentConfig:', configData); // TODO: delete this. Just for showcase.
    }

    public saveConfigData(properties: IConfigPanelProperty): void {
        this.saveConfigData$.next(properties);
    }

    // Delete this function. Need only for testing.
    private fooSize(): void {
        this.saveConfigData({
            size: {
                type: 'select',
                options: ['default', 'small', 'large'],
                value: 'default',
            },
        });
    }
    // Delete this function. Need only for testing.
    private fooPlaceholder(): void {
        this.saveConfigData({
            placeholder: {
                type: 'text',
                value: 'qqqq2222',
            },
        });
    }
}
